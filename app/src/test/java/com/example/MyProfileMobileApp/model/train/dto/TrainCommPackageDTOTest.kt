package com.example.MyProfileMobileApp.model.train.dto

import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Test

class TrainCommPackageDTOTest {
    @Test
    fun serialize_writesProtocolFrameAndCalculatedChecksums() {
        val packet = TrainCommPackageDTO().apply {
            setCommand(0x7f)
            setSequenceNum(2)
            setData(byteArrayOf(5))
        }

        val serialized = packet.serialize()

        assertArrayEquals(
            byteArrayOf(0x02, 0x00, 0x03, 0x03, 0x7f, 0x02, 0x05, 0x86.toByte(), 0x03),
            serialized
        )
        assertEquals(3, packet.dataSize.toInt())
        assertEquals(3, packet.dataSizeSum.toInt())
        assertEquals(-122, packet.dataSum.toInt())
    }

    @Test
    fun serialize_withoutPayload_stillIncludesCommandAndSequence() {
        val packet = TrainCommPackageDTO().apply {
            setCommand(1)
            setSequenceNum(2)
        }

        val serialized = packet.serialize()

        assertArrayEquals(byteArrayOf(0x02, 0x00, 0x02, 0x02, 0x01, 0x02, 0x03, 0x03), serialized)
        assertEquals(2, packet.dataSize.toInt())
        assertEquals(3, packet.dataSum.toInt())
    }
}
