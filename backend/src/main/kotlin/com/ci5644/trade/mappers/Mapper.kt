package com.ci5644.trade.mappers

interface Mapper<D,E> {
    fun fromEntity(entity: E): D
    fun toEntity(domain: D): E
}