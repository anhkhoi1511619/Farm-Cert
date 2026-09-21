package com.example.MyProfileMobileApp.model.AImessage;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.Calendar;

public class RequestMessageToAI {
    String model = "google/gemma-3-4b";
    String input = "LIN CAN trong hệ thống nhúng là gì?";

    public RequestMessageToAI(String input) {
        this.input = input;
    }
    public String toString() {
        StringBuilder ret = new StringBuilder();
        for (Field field : this.getClass().getDeclaredFields()) {
            try {
                Object val = field.get(this);
                String valStr = val != null ? val.toString() : "null";
                if(field.getType() == Calendar.class) valStr = "...";
                ret.append(field.getName()).append(": ").append(valStr).append(",");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ret.toString();
    }
    public JSONObject serialize() throws RuntimeException {
        JSONObject object = new JSONObject();
        try {
            object.put("model", model);
            object.put("input", input);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        return object;
    }
}
