package com.example.MyProfileMobileApp.model.train.factory;

public interface Send {
    byte[] serialize();
    void deserialize(byte[] data);
}
