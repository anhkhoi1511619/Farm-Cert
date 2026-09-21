package com.example.MyProfileMobileApp.model.train.factory;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import android.os.Bundle;

import com.example.MyProfileMobileApp.model.train.TrainTemp;
import com.example.MyProfileMobileApp.model.train.dto.RouteRequest;
import com.example.MyProfileMobileApp.model.train.dto.SubDirectionRequest;

import org.junit.Test;

public class TrainFactoryMockitoTest {
    @Test
    public void mainFactory_mapsMockedRouteBundleIntoRouteRequest() {
        Bundle bundle = mock(Bundle.class);
        when(bundle.getInt("routeNum", TrainTemp.currentRouteId)).thenReturn(98765);

        Send send = new MainFactory().fill(10, 7, bundle);

        assertTrue(send instanceof RouteRequest);
        RouteRequest request = (RouteRequest) send;
        assertEquals(98765, request.currentRouteId);
        assertEquals(10, request.getCommand());
        assertEquals(7, request.getSequenceNum());
        verify(bundle).getInt("routeNum", TrainTemp.currentRouteId);
    }

    @Test
    public void subFactory_mapsMockedDirectionBundleIntoSubDirectionRequest() {
        Bundle bundle = mock(Bundle.class);
        when(bundle.getInt("direction", TrainTemp.directionNum)).thenReturn(4);
        when(bundle.getInt("controllerNum", TrainTemp.controllerNumber)).thenReturn(3);

        Send send = new SubFactory().fill(192, 11, bundle);

        assertTrue(send instanceof SubDirectionRequest);
        SubDirectionRequest request = (SubDirectionRequest) send;
        assertEquals(4, request.direction);
        assertEquals(3, request.controllerNumber);
        assertEquals(192, request.getCommand());
        assertEquals(11, request.getSequenceNum());
        verify(bundle).getInt("direction", TrainTemp.directionNum);
        verify(bundle).getInt("controllerNum", TrainTemp.controllerNumber);
    }
}
