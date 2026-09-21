package com.example.MyProfileMobileApp.model.AImessage;

import com.example.MyProfileMobileApp.model.balance.BalanceResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Calendar;

public class ResponseMessageFromAI {
    public String model_instance_id = "google/gemma-3-4b";
    public String response_id = "No Reply";
    public static class Status {
        public int input_tokens;
        String total_output_tokens;
        String reasoning_output_tokens;
        String tokens_per_second;
        String time_to_first_token_seconds;
    }
    public static class Output {
        public String type = "No Received Type";
        public String content = "No Received Content";

        public Output(String type, String content) {
            this.type = type;
            this.content = content;
        }

        public Output() {
        }
    }
    public ArrayList<Output> outputs = new ArrayList<>();
    public void deserialize(JSONObject jsonObject) throws JSONException {
        model_instance_id = (String) jsonObject.get("model_instance_id");
        response_id = (String) jsonObject.get("response_id");
        outputs.clear();
        if(jsonObject.isNull("output")) return;
        JSONArray jsonArray = jsonObject.getJSONArray("output");
        for (int i = 0; i < jsonArray.length(); i++) {
            Output output = new Output();
            JSONObject object = jsonArray.getJSONObject(i);
            output.type = object.getString("type");
            output.content = object.getString("content");
            outputs.add(output);
        }
        if(jsonObject.isNull("stats")) return;
        JSONObject statsField = (JSONObject) jsonObject.get("stats");
        Status stats = new Status();
        stats.input_tokens = (int) statsField.get("input_tokens");
        //Add More ...
    }

    public String toString() {
        StringBuilder ret = new StringBuilder();
        for (Field field : this.getClass().getFields()) {
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
}
