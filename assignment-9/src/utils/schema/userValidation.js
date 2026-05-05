export const userValidationSchema = {
    
    username: {
        notEmpty: {
            errorMessage: "user name can not be null"  // Changed ; to ,
        },
        isLength: {
            options: {
                min: 3,
                max: 20
            },
            errorMessage: "This is b/n 3-20 characters"
        }
    }, // Added comma here
    displayName: {
        notEmpty: {
            errorMessage: "display name can not be null"  // Fixed syntax
        }
    }
};