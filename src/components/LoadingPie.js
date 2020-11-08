import React, { Component } from 'react'
import './loadingPie.scss'

function animation(dur) { return {
  __html: '<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="' + dur + '" repeatCount="indefinite"></animateTransform>'
}}

const LoadingPie = () => {
  return (
    <svg className="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none"></rect><path d="M0 50A50 50 0 0 1 50 0L50 50L0 50" opacity="0.5" transform="rotate(285 50 50)" dangerouslySetInnerHTML={animation("0.8s")}></path><path d="M50 0A50 50 0 0 1 100 50L50 50L50 0" opacity="0.5" transform="rotate(322.5 50 50)" dangerouslySetInnerHTML={animation("1.6s")}></path><path d="M100 50A50 50 0 0 1 50 100L50 50L100 50" opacity="0.5" transform="rotate(335 50 50)" dangerouslySetInnerHTML={animation("2.4s")}></path><path d="M50 100A50 50 0 0 1 0 50L50 50L50 100" opacity="0.5" transform="rotate(341.25 50 50)" dangerouslySetInnerHTML={animation("0.8s")}></path></svg>
  )
}

export default LoadingPie
