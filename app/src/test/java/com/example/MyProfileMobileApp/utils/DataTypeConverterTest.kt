package com.example.MyProfileMobileApp.utils

import java.util.Calendar
import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertSame
import org.junit.Test

class DataTypeConverterTest {
    @Test
    fun castInt_readsBigEndianBytes_andHonorsRange() {
        val input = byteArrayOf(0x12, 0x34, 0x56, 0x78)

        assertEquals(0x12345678, DataTypeConverter.castInt(input))
        assertEquals(0x3456, DataTypeConverter.castInt(input, 1, 2))
    }

    @Test
    fun castIntFromBCD_convertsEachByteToTwoDigits() {
        assertEquals(123456, DataTypeConverter.castIntFromBCD(byteArrayOf(0x12, 0x34, 0x56)))
    }

    @Test
    fun toBytes_writesFixedLengthBigEndianValue() {
        assertArrayEquals(byteArrayOf(0x12, 0x34, 0x56), DataTypeConverter.toBytes(0x123456, 3))
    }

    @Test
    fun bcdToTime_updatesOnlyTheTimeFields() {
        val calendar = Calendar.getInstance().apply { clear() }

        val result = DataTypeConverter.bcdToTime(byteArrayOf(9, 30, 45), calendar)

        assertEquals(calendar, result)
        assertEquals(9, calendar.get(Calendar.HOUR_OF_DAY))
        assertEquals(30, calendar.get(Calendar.MINUTE))
        assertEquals(45, calendar.get(Calendar.SECOND))
    }

    @Test
    fun castInt_treatsBytesAsUnsigned() {
        assertEquals(65535, DataTypeConverter.castInt(byteArrayOf(0xff.toByte(), 0xff.toByte())))
    }

    @Test
    fun castIntFromBCD_handlesLeadingZeroes() {
        assertEquals(123, DataTypeConverter.castIntFromBCD(byteArrayOf(0x01, 0x23)))
    }

    @Test
    fun toBytes_truncatesToTheRequestedNumberOfBytes() {
        assertArrayEquals(byteArrayOf(0x34, 0x56), DataTypeConverter.toBytes(0x123456, 2))
    }

    @Test
    fun sum_usesByteOverflowSemantics() {
        assertEquals(-2, DataTypeConverter.sum(byteArrayOf(127, 127)).toInt())
    }

    @Test
    fun bcdToTime_returnsCalendarUnchangedWhenInputIsTooLong() {
        val calendar = Calendar.getInstance().apply { set(2026, Calendar.JANUARY, 2, 3, 4, 5) }

        val result = DataTypeConverter.bcdToTime(byteArrayOf(1, 2, 3, 4), calendar)

        assertSame(calendar, result)
        assertEquals(3, calendar.get(Calendar.HOUR_OF_DAY))
        assertEquals(4, calendar.get(Calendar.MINUTE))
        assertEquals(5, calendar.get(Calendar.SECOND))
    }
}
