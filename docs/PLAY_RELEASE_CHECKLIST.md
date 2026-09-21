# Google Play release checklist

## Completed in repository

- Application ID set to `com.Zz1511619zZ.farmcert`.
- `compileSdk` and `targetSdk` set to 36.
- Gradle/AGP configuration updated for API 36 support.
- Local release-signing configuration added without committing secrets.
- Store listing, privacy policy, and Data Safety drafts added.

## Required on a machine with Android Studio/JDK 17

1. Install Android SDK Platform 36, Android SDK Build-Tools, and JDK 17.
2. Create `release-keystore/farm-cert-upload.jks` and `keystore.properties` from the example file.
3. Run `./gradlew bundleRelease` and verify `app/build/outputs/bundle/release/app-release.aab`.
4. Back up the keystore and passwords securely. Never commit them to GitHub.
5. Test the signed AAB through Play Console Internal testing.

## Play Console

- Complete developer account verification.
- Create the app and select the correct app category/content declarations.
- Upload the store icon, feature graphic, and real app screenshots.
- Publish the privacy policy at a public HTTPS URL.
- Complete Data Safety, content rating, target audience, ads, and app access forms.
- Use Internal testing first; if the account is a new personal account, follow Google's closed-testing requirement before Production access.
