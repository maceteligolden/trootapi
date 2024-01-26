export const env = {
    BASE_URL: `${process.env.BASE_URL}` || "",
    NODE_ENV: `${process.env.NODE_ENV}` || "local",
    PORT: process.env.PORT || 5000,
    JWT_SECRET: `${process.env.SECRET}` || "",
    AWS: {
        ACCESSKEYID: process.env.ACCESSKEYID || "",
        SECRETACCESSKEY: process.env.SECRETACCESSKEY || "",
        AWSREGION: process.env.AWS_REGION || "",
        S3: {
            ASSETS: "storage-promptcomputers"
        },
        SES: {
            EMAIL: `${process.env.AWS_SES_EMAIL}` || ""
        },
        SQS: {
            EMAIL_QUEUE_URL: `${process.env.AWS_EMAIL_SQS_QUEUE_URL}` || ""
        },
        SNS: {
            PLATFORM_APPLICATION_ARN: `${process.env.AWS_PLATFORM_APPLICATION_ARM}` || ""
        }
    },
    DATABASE: {
        URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/trootfindr"
    },
    STRIPE: {
        TEST_API_KEY: "sk_test_51NsnPDH3aI1kPWD1Gml2MseAygDnypESJ0Dg9DYiKC6iFHSQKZmjNPgDVZk1R67M3fD4OahVzCvV0fuLOV6f9QBD00pnNcrcLo"
    }
};