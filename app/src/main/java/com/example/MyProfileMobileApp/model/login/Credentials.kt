package com.example.MyProfileMobileApp.model.login

data class Credentials(
    var login: String,
    var password: String,
    var remember: Boolean = false,
    var isSuccessLogin: Boolean = true
) {
    fun isNotEmpty(): Boolean {
        return login.isNotEmpty() && password.isNotEmpty()
    }

}
