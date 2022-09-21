import React from 'react'
import loadingImg from '../../img/Loading2.gif'
import s from './Loading.module.css'

export default function Loading() {
  return (
    <div className={s.loadingImg}>
        <img   src={loadingImg} alt='Loading'/>
    </div>
  )
}
