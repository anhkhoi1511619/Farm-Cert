package com.example.MyProfileMobileApp.utils

import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Test

class TrainDataUtilsTest {
    @Test
    fun toBCD_encodesEachDecimalDigitIntoANibble() {
        assertEquals(0x1123, TrainDataUtils.toBCD(1123).toInt())
        assertEquals(0x0009, TrainDataUtils.toBCD(9).toInt())
    }

    @Test
    fun toBytes_withoutSize_returnsFourBigEndianBytes() {
        assertArrayEquals(
            byteArrayOf(0x12, 0x34, 0x56, 0x78),
            TrainDataUtils.toBytes(0x12345678)
        )
    }

    @Test
    fun castInt_andToBytes_roundTripPositiveValues() {
        val original = 0x00ABCDEF

        assertEquals(original, TrainDataUtils.castInt(TrainDataUtils.toBytes(original)))
    }

    @Test
    fun sum_returnsZeroForAnEmptyArray() {
        assertEquals(0, TrainDataUtils.sum(byteArrayOf()).toInt())
    }
}
