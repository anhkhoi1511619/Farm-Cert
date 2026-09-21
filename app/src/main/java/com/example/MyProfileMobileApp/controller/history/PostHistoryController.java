package com.example.MyProfileMobileApp.controller.history;

import android.content.Context;

import androidx.core.util.Consumer;

import com.example.MyProfileMobileApp.database.PostHistoryDatabase;
import com.example.MyProfileMobileApp.model.history.PostHistoryData;
import com.example.MyProfileMobileApp.utils.TLog_Sync;
import com.example.MyProfileMobileApp.database.PostHistoryDao;
import com.example.MyProfileMobileApp.database.PostHistoryDatabase;
import com.example.MyProfileMobileApp.database.PostHistoryEntity;
import com.example.MyProfileMobileApp.model.post.dto.Post;
import com.example.MyProfileMobileApp.model.history.PostHistoryData;
import com.example.MyProfileMobileApp.utils.TLog;
import com.example.MyProfileMobileApp.utils.TLog_Sync;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.stream.Collectors;

public class PostHistoryController {
    static final String TAG = PostHistoryController.class.getSimpleName();
    static PostHistoryDatabase db;
    static PostHistoryDao dao;
    static final ScheduledExecutorService historyExecutor = Executors.newScheduledThreadPool(2);


    public PostHistoryController(Context context) {
        db = PostHistoryDatabase.getDatabase(context);
        dao = db.postHistoryDao();
    }


    public static void set(Post post, long currentTime) {
        if(post == null) return;
        String authorName = post.getMetaData().getAuthor().getName();
        String title = post.getTitle();
        PostHistoryEntity entity = new PostHistoryEntity(currentTime, authorName, title);
        TLog_Sync.d(TAG,"Set system time  "+ currentTime+"  author: "+authorName+"  title"+title+" to Database");
        historyExecutor.execute(()->dao.insertPost(entity));
    }

    public static void get(int postNumber, Consumer<List<PostHistoryData>> callback) {
        historyExecutor.execute(()->{
            List<PostHistoryData> list = dao.getPostHistoryList(postNumber).stream()
                    .map(e->new PostHistoryData(e.getDate(), e.getAuthor(), e.getTitle()))
                    .collect(Collectors.toList());
            list.stream().forEach(value->{
                TLog_Sync.d(TAG,"Get System Time  "+ value.getDate()+" Author: "+value.getAuthor()+" Title:   "+value.getTitle()+"  from Database");
            });
            callback.accept(list);
        });
    }
}
