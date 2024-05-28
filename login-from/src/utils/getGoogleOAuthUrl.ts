export function getGoogleOAuthUrl() {
    const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redire_uri: "http://localhost:8000/api/v1/sessions/oauth/google",
        client_id:
            "419165203946-dpq3l4csi3nltmqsdesig6uvlac3hlu4.apps.googleusercontent.com",
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        flowName: "GeneralOAuthFlow",
        scopes: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    console.log({ options });

    const qs = new URLSearchParams(options);

    console.log(qs.toString());

    return `${rootURL}?${qs.toString()}`;
}
