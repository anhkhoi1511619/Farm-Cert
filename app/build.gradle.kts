import java.util.Properties

val lmStudioBaseUrl = providers.gradleProperty("lmStudioBaseUrl").orNull?.trim().orEmpty()
val escapedLmStudioBaseUrl = lmStudioBaseUrl
    .replace("\\", "\\\\")
    .replace("\"", "\\\"")

@Suppress("DSL_SCOPE_VIOLATION") // TODO: Remove once KTIJ-19369 is fixed

plugins {
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.kotlinAndroid)
}

val releaseKeystorePropertiesFile = rootProject.file("keystore.properties")
val releaseKeystoreProperties = Properties()
if (releaseKeystorePropertiesFile.exists()) {
    releaseKeystorePropertiesFile.inputStream().use(releaseKeystoreProperties::load)
}

android {
    namespace = "com.Zz1511619zZ.farmcert"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.Zz1511619zZ.farmcert"
        minSdk = 28
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        // Configure with -PlmStudioBaseUrl=https://your-lm-studio-host.
        // An empty value keeps the feature explicitly unavailable by default.
        buildConfigField("String", "LM_STUDIO_BASE_URL", "\"$escapedLmStudioBaseUrl\"")

        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    if (releaseKeystorePropertiesFile.exists()) {
        signingConfigs {
            create("release") {
                storeFile = file(releaseKeystoreProperties["storeFile"] as String)
                storePassword = releaseKeystoreProperties["storePassword"] as String
                keyAlias = releaseKeystoreProperties["keyAlias"] as String
                keyPassword = releaseKeystoreProperties["keyPassword"] as String
            }
        }
        buildTypes.getByName("release").signingConfig = signingConfigs.getByName("release")
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        buildConfig = true
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.4.3"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {

    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.1")
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.1")
    implementation ("androidx.compose.material:material-icons-extended:1.4.3")

    implementation(libs.core.ktx)
    implementation(libs.activity.compose)
    implementation(platform(libs.compose.bom))
    implementation(libs.ui)
    implementation(libs.ui.graphics)
    implementation(libs.material3)
    testImplementation(libs.junit)
    testImplementation(libs.json)
    debugImplementation(libs.ui.tooling)
}
