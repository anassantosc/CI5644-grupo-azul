package com.ci5644.trade.entities

import jakarta.persistence.*
import org.hibernate.annotations.GenericGenerator

@Entity
class AlbumEntity (
        @Id
        @GeneratedValue(generator = "system-uuid")
        @GenericGenerator(name = "system-uuid", strategy = "uuid")
        val id: String,
        var name: String,
        var year: Int,
)