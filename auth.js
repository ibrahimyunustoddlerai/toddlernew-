// ToddlerChef AI Authentication System
class ToddlerChefAuth {
    constructor() {
        this.auth = window.auth;
        this.db = window.db;
        this.currentUser = null;
        this.userProfile = null;
        
        // Listen for auth state changes
        this.auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            if (user) {
                this.loadUserProfile();
                this.updateUIForAuthenticatedUser();
            } else {
                this.updateUIForUnauthenticatedUser();
            }
        });
    }

    // User Registration
    async registerUser(email, password, userData) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Create user profile in Firestore
            await this.createUserProfile(user.uid, userData);
            
            return { success: true, user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    // User Login
    async loginUser(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Google Sign In
    async signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.auth.signInWithPopup(provider);
            
            // Check if this is a new user
            if (result.additionalUserInfo.isNewUser) {
                // Create profile for new Google user
                await this.createUserProfile(result.user.uid, {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    provider: 'google'
                });
            }
            
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Google sign-in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Create User Profile
    async createUserProfile(uid, userData) {
        try {
            const profileData = {
                uid: uid,
                email: userData.email,
                displayName: userData.displayName || '',
                photoURL: userData.photoURL || '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                
                // Toddler-specific profile data
                children: userData.children || [],
                dietaryPreferences: userData.dietaryPreferences || [],
                allergies: userData.allergies || [],
                mealPlanningEnabled: true,
                premiumUser: false,
                
                // Default settings
                notifications: {
                    mealReminders: true,
                    newRecipes: true,
                    nutritionTips: true
                }
            };

            await this.db.collection('users').doc(uid).set(profileData);
            this.userProfile = profileData;
            
            return { success: true };
        } catch (error) {
            console.error('Profile creation error:', error);
            return { success: false, error: error.message };
        }
    }

    // Load User Profile
    async loadUserProfile() {
        if (!this.currentUser) return;
        
        try {
            const doc = await this.db.collection('users').doc(this.currentUser.uid).get();
            if (doc.exists) {
                this.userProfile = doc.data();
                return { success: true, profile: this.userProfile };
            } else {
                console.log('No profile found for user');
                return { success: false, error: 'Profile not found' };
            }
        } catch (error) {
            console.error('Profile loading error:', error);
            return { success: false, error: error.message };
        }
    }

    // Update User Profile
    async updateUserProfile(updates) {
        if (!this.currentUser) return { success: false, error: 'Not authenticated' };
        
        try {
            console.log('🔄 Starting updateUserProfile...');
            console.log('Updates:', updates);
            
            const updateData = {
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            console.log('📝 Update data:', updateData);
            
            // Check if user profile exists, if not create it
            console.log('🔍 Checking if user profile exists...');
            const userDoc = await this.db.collection('users').doc(this.currentUser.uid).get();
            
            if (!userDoc.exists) {
                console.log('📄 User profile does not exist, creating new profile...');
                // Create new user profile
                const newProfile = {
                    uid: this.currentUser.uid,
                    email: this.currentUser.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    ...updateData
                };
                console.log('📋 New profile data:', newProfile);
                await this.db.collection('users').doc(this.currentUser.uid).set(newProfile);
                console.log('✅ New profile created successfully');
            } else {
                console.log('📄 User profile exists, updating...');
                // Update existing profile
                await this.db.collection('users').doc(this.currentUser.uid).update(updateData);
                console.log('✅ Profile updated successfully');
            }
            
            console.log('🔄 Reloading user profile...');
            await this.loadUserProfile(); // Reload profile
            
            return { success: true };
        } catch (error) {
            console.error('❌ Profile update error:', error);
            console.error('Error details:', error.code, error.message);
            return { success: false, error: error.message };
        }
    }

    // Add Child Profile
    async addChild(childData) {
        if (!this.currentUser) return { success: false, error: 'Not authenticated' };
        
        try {
            console.log('🚀 Starting addChild process...');
            console.log('Current user:', this.currentUser.uid);
            console.log('Child data:', childData);
            
            // Test database connection first
            console.log('🔍 Testing database connection...');
            if (!this.db) {
                console.error('❌ Database not initialized');
                return { success: false, error: 'Database not initialized' };
            }
            
            const child = {
                id: Date.now().toString(), // Simple ID generation
                name: childData.name,
                age: childData.age,
                birthDate: childData.birthDate,
                allergies: childData.allergies || [],
                customAllergies: childData.customAllergies || '',
                dietaryPreferences: childData.dietaryPreferences || [],
                preferences: childData.preferences || '',
                dislikes: childData.dislikes || '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            console.log('✅ Child object created:', child);
            
            // Ensure userProfile is loaded
            if (!this.userProfile) {
                console.log('📋 Loading user profile...');
                const loadResult = await this.loadUserProfile();
                if (!loadResult.success) {
                    console.error('❌ Failed to load user profile:', loadResult.error);
                    return { success: false, error: 'Failed to load user profile: ' + loadResult.error };
                }
            }
            
            console.log('📊 Current userProfile:', this.userProfile);
            
            const children = this.userProfile.children || [];
            children.push(child);
            
            console.log('👶 Updated children array:', children);
            
            // Update the profile in Firestore
            console.log('💾 Updating profile in Firestore...');
            const updateResult = await this.updateUserProfile({ children });
            
            console.log('📤 Update result:', updateResult);
            
            if (updateResult.success) {
                // Ensure the local userProfile is updated with the new child
                this.userProfile.children = children;
                console.log('✅ Child added successfully:', child);
                return { success: true, child };
            } else {
                console.error('❌ Update failed:', updateResult.error);
                
                // Try fallback method - create child directly in Firestore
                console.log('🔄 Trying fallback method...');
                try {
                    const childDocRef = this.db.collection('children').doc();
                    await childDocRef.set({
                        userId: this.currentUser.uid,
                        ...child,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    
                    // Update local profile
                    this.userProfile.children = children;
                    console.log('✅ Child added via fallback method');
                    return { success: true, child: { ...child, id: childDocRef.id } };
                } catch (fallbackError) {
                    console.error('❌ Fallback method also failed:', fallbackError);
                    throw new Error('Failed to update user profile: ' + updateResult.error + ' | Fallback failed: ' + fallbackError.message);
                }
            }
        } catch (error) {
            console.error('❌ Add child error:', error);
            return { success: false, error: error.message };
        }
    }

    // Save Meal Plan
    async saveMealPlan(mealPlan) {
        if (!this.currentUser) return { success: false, error: 'Not authenticated' };
        
        try {
            const mealPlanData = {
                userId: this.currentUser.uid,
                weekStart: mealPlan.weekStart,
                meals: mealPlan.meals,
                shoppingList: mealPlan.shoppingList,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await this.db.collection('mealPlans').add(mealPlanData);
            return { success: true };
        } catch (error) {
            console.error('Save meal plan error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get User's Meal Plans
    async getMealPlans() {
        if (!this.currentUser) return { success: false, error: 'Not authenticated' };
        
        try {
            const snapshot = await this.db.collection('mealPlans')
                .where('userId', '==', this.currentUser.uid)
                .orderBy('weekStart', 'desc')
                .get();
            
            const mealPlans = [];
            snapshot.forEach(doc => {
                mealPlans.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, mealPlans };
        } catch (error) {
            console.error('Get meal plans error:', error);
            return { success: false, error: error.message };
        }
    }

    // Save Favorite Recipe
    async saveFavoriteRecipe(recipe) {
        if (!this.currentUser) return { success: false, error: 'Not authenticated' };
        
        try {
            const favoriteData = {
                userId: this.currentUser.uid,
                recipeId: recipe.id || Date.now().toString(),
                recipe: recipe,
                savedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await this.db.collection('favorites').add(favoriteData);
            return { success: true };
        } catch (error) {
            console.error('Save favorite error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get User's Favorite Recipes
    async getFavoriteRecipes() {
        if (!this.currentUser) return { success: false, error: 'Not authenticated' };
        
        try {
            const snapshot = await this.db.collection('favorites')
                .where('userId', '==', this.currentUser.uid)
                .orderBy('savedAt', 'desc')
                .get();
            
            const favorites = [];
            snapshot.forEach(doc => {
                favorites.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, favorites };
        } catch (error) {
            console.error('Get favorites error:', error);
            return { success: false, error: error.message };
        }
    }

    // Usage tracking for free tier limits
    async checkUsageLimit() {
        try {
            // Allow anonymous users to generate recipes (3 free recipes)
            if (!this.currentUser) {
                // Check localStorage for anonymous usage
                const anonymousUsage = this.getAnonymousUsage();
                if (anonymousUsage >= 3) {
                    return { 
                        canGenerate: false, 
                        reason: 'limit_reached', 
                        usageCount: anonymousUsage, 
                        maxUsage: 3,
                        anonymous: true
                    };
                }
                return { 
                    canGenerate: true, 
                    usageCount: anonymousUsage, 
                    maxUsage: 3,
                    anonymous: true
                };
            }

            const userProfile = this.getUserProfile();
            const subscriptionStatus = userProfile?.subscriptionStatus || 'free';

            // Premium users have unlimited usage
            if (subscriptionStatus === 'premium' || subscriptionStatus === 'pro') {
                return { canGenerate: true, unlimited: true };
            }

            // Check free tier usage
            const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
            const userUsageMonth = userProfile?.usageMonth;
            const monthlyUsage = userProfile?.monthlyUsage || 0;
            const maxFreeUsage = 3;

            // Reset usage if it's a new month
            if (userUsageMonth !== currentMonth) {
                await this.updateUserProfile({
                    monthlyUsage: 0,
                    usageMonth: currentMonth
                });
                return { canGenerate: true, usageCount: 0, maxUsage: maxFreeUsage };
            }

            // Check if user has reached the limit
            if (monthlyUsage >= maxFreeUsage) {
                return { 
                    canGenerate: false, 
                    reason: 'limit_reached', 
                    usageCount: monthlyUsage, 
                    maxUsage: maxFreeUsage 
                };
            }

            return { 
                canGenerate: true, 
                usageCount: monthlyUsage, 
                maxUsage: maxFreeUsage 
            };

        } catch (error) {
            console.error('Check usage limit error:', error);
            return { canGenerate: false, reason: 'error', error: error.message };
        }
    }

    // Get anonymous usage from localStorage
    getAnonymousUsage() {
        try {
            const usage = localStorage.getItem('toddlerChefAnonymousUsage');
            return usage ? parseInt(usage) : 0;
        } catch (error) {
            return 0;
        }
    }

    // Increment anonymous usage
    incrementAnonymousUsage() {
        try {
            const currentUsage = this.getAnonymousUsage();
            const newUsage = currentUsage + 1;
            localStorage.setItem('toddlerChefAnonymousUsage', newUsage.toString());
            return newUsage;
        } catch (error) {
            console.error('Error incrementing anonymous usage:', error);
            return 0;
        }
    }

    // Increment usage count
    async incrementUsage() {
        try {
            if (!this.currentUser) {
                // Handle anonymous users
                const newUsage = this.incrementAnonymousUsage();
                console.log(`✅ Anonymous usage incremented to ${newUsage}`);
                return { success: true, newUsageCount: newUsage, anonymous: true };
            }

            const userProfile = this.getUserProfile();
            const currentMonth = new Date().toISOString().slice(0, 7);
            const currentUsage = userProfile?.monthlyUsage || 0;

            await this.updateUserProfile({
                monthlyUsage: currentUsage + 1,
                usageMonth: currentMonth,
                lastUsedDate: new Date().toISOString()
            });

            console.log(`✅ Usage incremented to ${currentUsage + 1}`);
            return { success: true, newUsageCount: currentUsage + 1 };

        } catch (error) {
            console.error('Increment usage error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get usage statistics
    getUsageStats() {
        const userProfile = this.getUserProfile();
        const subscriptionStatus = userProfile?.subscriptionStatus || 'free';
        const monthlyUsage = userProfile?.monthlyUsage || 0;
        const maxFreeUsage = 3;

        return {
            subscriptionStatus,
            monthlyUsage,
            maxFreeUsage,
            remainingUsage: Math.max(0, maxFreeUsage - monthlyUsage),
            isUnlimited: subscriptionStatus === 'premium' || subscriptionStatus === 'pro'
        };
    }

    // Sign Out
    async signOut() {
        try {
            await this.auth.signOut();
            this.currentUser = null;
            this.userProfile = null;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    // Update UI for authenticated user
    updateUIForAuthenticatedUser() {
        // Update navigation
        const authButtons = document.querySelectorAll('.auth-button');
        authButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Show user menu
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.style.display = 'block';
            const userName = userMenu.querySelector('.user-name');
            if (userName && this.userProfile) {
                userName.textContent = this.userProfile.displayName || this.currentUser.email;
            }
        }
        
        // Show premium features if user is premium
        if (this.userProfile && this.userProfile.premiumUser) {
            this.showPremiumFeatures();
        }
    }

    // Update UI for unauthenticated user
    updateUIForUnauthenticatedUser() {
        // Show auth buttons
        const authButtons = document.querySelectorAll('.auth-button');
        authButtons.forEach(btn => {
            btn.style.display = 'block';
        });
        
        // Hide user menu
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.style.display = 'none';
        }
        
        // Hide premium features
        this.hidePremiumFeatures();
    }

    // Show premium features
    showPremiumFeatures() {
        const premiumElements = document.querySelectorAll('.premium-feature');
        premiumElements.forEach(el => {
            el.style.display = 'block';
        });
    }

    // Hide premium features
    hidePremiumFeatures() {
        const premiumElements = document.querySelectorAll('.premium-feature');
        premiumElements.forEach(el => {
            el.style.display = 'none';
        });
    }

    // Check if user is premium
    isPremiumUser() {
        return this.userProfile && this.userProfile.premiumUser;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get user profile
    getUserProfile() {
        return this.userProfile;
    }

    // Check authentication state
    async checkAuthState() {
        return new Promise((resolve) => {
            const unsubscribe = this.auth.onAuthStateChanged((user) => {
                unsubscribe(); // Unsubscribe after first check
                resolve({
                    isAuthenticated: !!user,
                    user: user
                });
            });
        });
    }
}

// Initialize authentication system
let toddlerChefAuth;

// Load Firebase SDK and initialize
async function initializeFirebase() {
    try {
        // Load Firebase SDK scripts
        await loadFirebaseScripts();
        
        // Initialize our auth system
        toddlerChefAuth = new ToddlerChefAuth();
        window.toddlerChefAuth = toddlerChefAuth;
        
        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        return false;
    }
}

// Load Firebase SDK scripts
function loadFirebaseScripts() {
    return new Promise((resolve, reject) => {
        // Check if Firebase is already loaded
        if (window.firebase) {
            resolve();
            return;
        }

        // Load Firebase App
        const appScript = document.createElement('script');
        appScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
        appScript.onload = () => {
            // Load Firebase Auth
            const authScript = document.createElement('script');
            authScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js';
            authScript.onload = () => {
                // Load Firebase Firestore
                const firestoreScript = document.createElement('script');
                firestoreScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
                firestoreScript.onload = () => {
                    // Load our config
                    const configScript = document.createElement('script');
                    configScript.src = 'firebase-config.js';
                    configScript.onload = () => {
                        resolve();
                    };
                    configScript.onerror = () => {
                        reject(new Error('Failed to load Firebase config'));
                    };
                    document.head.appendChild(configScript);
                };
                firestoreScript.onerror = () => {
                    reject(new Error('Failed to load Firebase Firestore'));
                };
                document.head.appendChild(firestoreScript);
            };
            authScript.onerror = () => {
                reject(new Error('Failed to load Firebase Auth'));
            };
            document.head.appendChild(authScript);
        };
        appScript.onerror = () => {
            reject(new Error('Failed to load Firebase App'));
        };
        document.head.appendChild(appScript);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeFirebase();
});