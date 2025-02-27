import React from 'react'
import { SvgIcon } from '@mui/material'
import { SxProps } from '@mui/system'

import continuousMappingFunctionIcon from '../../assets/continuous_mapping.svg'
import passthroughMappingFunctionIcon from '../../assets/passthrough_mapping.svg'
import discreteMappingFunctionIcon from '../../assets/discrete_mapping.svg'

const defaultIconStyle = {
  style: { fontSize: 20, margin: 0 },
  sx: {
    p: 0,
    m: 0,
  },
}

export interface IconProps {
  style?: React.CSSProperties
  sx?: SxProps
  isSelected?: boolean
}

/* ====[ LOGOS ]============================================================================== */

export function AppLogoIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 64 64"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M44.909,47.811 C49.379,47.811 53.003,51.436 53.003,55.906 C53.003,60.375 49.379,64 44.909,64 C40.439,64 36.814,60.375 36.814,55.906 C36.814,53.836 37.6,51.87 38.996,50.378 L35.362,43.124 C35.008,43.166 34.652,43.187 34.295,43.187 C32.482,43.187 30.732,42.643 29.251,41.631 L25.136,45.255 C25.164,45.468 25.177,45.682 25.177,45.898 C25.177,48.625 22.966,50.837 20.239,50.837 C17.512,50.837 15.3,48.625 15.3,45.898 C15.3,43.171 17.512,40.959 20.239,40.959 C20.709,40.959 21.175,41.026 21.624,41.157 L25.911,37.381 C25.692,36.801 25.536,36.2 25.443,35.586 L15.224,34.21 C13.826,36.808 11.099,38.469 8.094,38.469 C3.625,38.469 0,34.843 0,30.374 C0,25.905 3.625,22.28 8.094,22.28 C12.027,22.28 15.347,25.1 16.051,28.881 L26.268,30.258 C26.336,30.121 26.408,29.986 26.483,29.852 L18.676,21.881 C17.663,22.32 16.57,22.546 15.458,22.546 C10.988,22.546 7.363,18.922 7.363,14.452 C7.363,9.983 10.988,6.358 15.458,6.358 C18.201,6.358 20.726,7.741 22.212,9.991 L34.017,7.014 C34.547,3.044 37.949,0 42.04,0 C46.509,0 50.135,3.625 50.135,8.094 C50.135,12.453 46.687,16.008 42.372,16.182 L39.173,26.721 C41.695,28.36 43.25,31.173 43.25,34.232 C43.25,36.8 42.157,39.211 40.272,40.9 L43.774,47.89 C44.15,47.837 44.529,47.811 44.909,47.811 z M33.981,25.283 L37.223,14.599 C36.395,13.985 35.69,13.218 35.148,12.341 L23.51,15.276 C23.406,16.303 23.107,17.298 22.628,18.21 L30.413,26.16 C31.527,25.624 32.739,25.325 33.981,25.283 z" />
    </SvgIcon>
  )
}

export function Cy3LogoIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 64 64"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M44.909,47.811 C49.379,47.811 53.003,51.436 53.003,55.906 C53.003,60.375 49.379,64 44.909,64 C40.439,64 36.814,60.375 36.814,55.906 C36.814,53.836 37.6,51.87 38.996,50.378 L35.362,43.124 C35.008,43.166 34.652,43.187 34.295,43.187 C32.482,43.187 30.732,42.643 29.251,41.631 L25.136,45.255 C25.164,45.468 25.177,45.682 25.177,45.898 C25.177,48.625 22.966,50.837 20.239,50.837 C17.512,50.837 15.3,48.625 15.3,45.898 C15.3,43.171 17.512,40.959 20.239,40.959 C20.709,40.959 21.175,41.026 21.624,41.157 L25.911,37.381 C25.692,36.801 25.536,36.2 25.443,35.586 L15.224,34.21 C13.826,36.808 11.099,38.469 8.094,38.469 C3.625,38.469 0,34.843 0,30.374 C0,25.905 3.625,22.28 8.094,22.28 C12.027,22.28 15.347,25.1 16.051,28.881 L26.268,30.258 C26.336,30.121 26.408,29.986 26.483,29.852 L18.676,21.881 C17.663,22.32 16.57,22.546 15.458,22.546 C10.988,22.546 7.363,18.922 7.363,14.452 C7.363,9.983 10.988,6.358 15.458,6.358 C18.201,6.358 20.726,7.741 22.212,9.991 L34.017,7.014 C34.547,3.044 37.949,0 42.04,0 C46.509,0 50.135,3.625 50.135,8.094 C50.135,12.453 46.687,16.008 42.372,16.182 L39.173,26.721 C41.695,28.36 43.25,31.173 43.25,34.232 C43.25,36.8 42.157,39.211 40.272,40.9 L43.774,47.89 C44.15,47.837 44.529,47.811 44.909,47.811 z M33.981,25.283 L37.223,14.599 C36.395,13.985 35.69,13.218 35.148,12.341 L23.51,15.276 C23.406,16.303 23.107,17.298 22.628,18.21 L30.413,26.16 C31.527,25.624 32.739,25.325 33.981,25.283 z" />
    </SvgIcon>
  )
}

export function NDExLogoIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 64 64"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M60.77,35.99 C60.236,36.51 59.678,36.986 59.094,37.42 C58.51,37.854 57.934,38.25 57.364,38.612 C55.566,39.57 53.836,40.688 51.974,41.49 C51.374,41.75 50.762,42.018 50.14,42.29 C49.52,42.564 48.902,42.82 48.288,43.058 C47.674,43.296 47.056,43.552 46.436,43.828 C45.182,44.26 43.938,44.684 42.702,45.102 C41.47,45.52 40.212,45.924 38.934,46.312 C38.302,46.47 37.68,46.65 37.074,46.852 C35.236,47.462 33.246,47.996 31.358,48.386 C30.804,48.486 30.284,48.36 29.796,48.004 C29.312,47.648 29.026,47.16 28.942,46.538 C28.858,45.916 28.96,45.326 29.248,44.77 C29.706,43.89 30.72,43.686 31.56,43.568 C33.074,43.354 34.66,42.84 36.16,42.49 C36.772,42.346 37.394,42.194 38.028,42.036 C39.268,41.676 40.498,41.324 41.718,40.978 C42.94,40.632 44.158,40.258 45.372,39.856 C46.586,39.452 47.794,39.038 48.996,38.612 C51.328,37.784 53.706,36.764 55.886,35.508 C57.554,34.538 60.06,33.084 60.82,30.914 C62.872,22.946 37.278,23.504 38.886,23.01 C45.276,22.528 54.134,21.442 60.298,24.86 C60.478,24.974 60.64,25.086 60.786,25.196 C60.934,25.304 61.098,25.418 61.278,25.534 C65.264,28.412 63.666,33.212 60.77,35.99 z" />
      <path d="M3.23,29.03 C0.334,31.808 -1.264,36.608 2.724,39.488 C2.902,39.602 3.066,39.716 3.214,39.824 C3.36,39.934 3.524,40.046 3.702,40.16 C9.866,43.578 18.724,42.492 25.114,42.01 C26.722,41.516 1.128,42.076 3.18,34.106 C3.94,31.936 6.448,30.482 8.114,29.514 C10.294,28.256 12.67,27.236 15.002,26.408 C16.206,25.982 17.414,25.57 18.628,25.166 C19.842,24.762 21.062,24.388 22.282,24.044 C23.502,23.696 24.732,23.344 25.972,22.984 C26.604,22.826 27.228,22.674 27.842,22.53 C29.34,22.18 30.926,21.666 32.44,21.452 C33.28,21.334 34.294,21.13 34.752,20.25 C35.04,19.694 35.144,19.104 35.058,18.482 C34.974,17.86 34.688,17.372 34.204,17.016 C33.716,16.662 33.196,16.536 32.642,16.636 C30.754,17.024 28.764,17.558 26.926,18.168 C26.318,18.37 25.7,18.55 25.066,18.708 C23.788,19.096 22.53,19.502 21.298,19.918 C20.062,20.336 18.818,20.762 17.566,21.194 C16.944,21.468 16.326,21.724 15.712,21.962 C15.098,22.2 14.48,22.456 13.86,22.73 C13.238,23.004 12.628,23.272 12.028,23.53 C10.164,24.332 8.436,25.45 6.636,26.41 C6.066,26.77 5.49,27.166 4.906,27.6 C4.322,28.034 3.764,28.51 3.23,29.03 z" />
      <path d="M39.39,14 C41.058,14.36 42.01,15.562 42.222,17.2 C42.388,19.172 41.096,20.934 39.34,21.138 C38.854,21.196 38.382,21.126 37.952,20.954 L33.16,30.24 C33.344,30.44 33.492,30.684 33.586,30.96 L37.26,30.242 C37.296,29.348 37.908,28.592 38.728,28.498 C39.618,28.394 40.41,29.12 40.492,30.12 C40.576,31.12 39.922,32.016 39.03,32.118 C38.27,32.208 37.584,31.692 37.346,30.918 L33.706,31.63 C33.726,32.32 33.434,32.954 32.966,33.346 L34.27,36.712 C35.158,36.47 36.78,37.452 36.892,38.8 C37.002,40.12 36.138,41.302 34.96,41.44 C33.782,41.576 32.722,40.412 32.628,39.296 C32.534,38.18 32.938,37.54 33.572,37.058 L32.272,33.704 C32.204,33.722 32.132,33.734 32.062,33.742 C31.852,33.768 31.646,33.75 31.454,33.698 L26.696,43.404 C27.42,43.988 27.924,44.91 28.014,45.988 C28.18,47.986 26.872,49.774 25.092,49.98 C23.312,50.188 21.732,48.736 21.564,46.738 C21.398,44.74 22.706,42.954 24.486,42.746 C24.93,42.694 25.364,42.746 25.764,42.884 L30.554,33.11 C30.366,32.882 30.224,32.604 30.144,32.294 L27.298,32.852 C27.296,33.59 26.792,34.228 26.124,34.306 C25.412,34.39 24.78,33.808 24.714,33.01 C24.646,32.21 25.17,31.496 25.882,31.412 C26.496,31.34 27.05,31.762 27.234,32.392 L30.076,31.836 L30.076,31.838 C30.06,31.46 30.136,31.098 30.284,30.782 L27.338,28.442 C27.078,28.732 26.732,28.926 26.34,28.972 C25.434,29.078 24.632,28.34 24.548,27.324 C24.462,26.31 25.128,25.402 26.032,25.296 C26.936,25.19 27.74,25.928 27.824,26.944 C27.854,27.292 27.794,27.628 27.668,27.922 L30.622,30.27 C30.824,30.044 31.074,29.87 31.356,29.77 L30.904,26.68 C29.952,26.722 29.132,25.932 29.042,24.852 C28.948,23.732 29.682,22.73 30.68,22.612 C31.68,22.496 32.566,23.31 32.658,24.432 C32.736,25.362 32.242,26.212 31.5,26.54 L31.962,29.674 C32.054,29.676 32.146,29.688 32.234,29.706 L37.042,20.39 C36.39,19.81 35.944,18.944 35.86,17.94 C35.694,15.97 36.986,14.206 38.742,14.002 L39.39,14 z M25.042,43.778 L24.574,43.78 C23.3,43.928 22.366,45.204 22.486,46.63 C22.606,48.058 23.734,49.096 25.006,48.948 C26.278,48.8 27.212,47.522 27.092,46.096 C26.882,44.896 26.284,44.044 25.042,43.778 z M34.926,37.338 L34.616,37.338 C33.776,37.436 33.156,38.282 33.236,39.226 C33.316,40.168 34.062,40.854 34.904,40.756 C35.744,40.658 36.362,39.814 36.284,38.87 C36.144,38.078 35.748,37.514 34.926,37.338 z M26.104,31.824 L25.916,31.826 C25.408,31.884 25.034,32.396 25.082,32.966 C25.13,33.538 25.582,33.952 26.09,33.894 C26.598,33.834 26.972,33.324 26.926,32.752 C26.84,32.272 26.602,31.932 26.104,31.824 z M32.032,30.264 L31.77,30.264 C31.056,30.348 30.532,31.064 30.6,31.864 C30.666,32.664 31.3,33.246 32.012,33.164 C32.726,33.08 33.25,32.364 33.184,31.564 C33.066,30.89 32.73,30.412 32.032,30.264 z M39.004,29.014 L38.77,29.016 C38.134,29.09 37.666,29.728 37.726,30.442 C37.786,31.156 38.35,31.676 38.988,31.602 C39.624,31.528 40.092,30.888 40.032,30.174 C39.926,29.574 39.626,29.148 39.004,29.014 z M26.314,25.82 L26.076,25.82 C25.43,25.896 24.954,26.546 25.016,27.27 C25.076,27.996 25.65,28.522 26.296,28.448 C26.942,28.372 27.418,27.724 27.356,26.998 C27.25,26.388 26.944,25.956 26.314,25.82 z M30.992,23.192 L30.728,23.192 C30.016,23.274 29.49,23.992 29.558,24.792 C29.624,25.592 30.258,26.174 30.972,26.092 C31.684,26.008 32.21,25.292 32.142,24.492 C32.024,23.818 31.688,23.34 30.992,23.192 z M39.29,15.02 L38.828,15.022 C37.574,15.168 36.652,16.428 36.77,17.834 C36.886,19.242 38,20.266 39.254,20.12 C40.51,19.974 41.432,18.714 41.314,17.306 C41.106,16.124 40.514,15.282 39.29,15.02 z" />
    </SvgIcon>
  )
}

/* ====[ LAYOUTS ]============================================================================ */

export function LayoutIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 64 64"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M32,2 C35.314,2 38,4.686 38,8 C37.997,8.702 37.889,9.408 37.615,10.057 L48.361,16.197 C49.625,14.749 51.097,14.096 53,14 L53,14 C56.314,14 59,16.686 59,20 C58.912,23.054 56.962,25.286 54,25.89 L54,38.11 C57.017,38.651 58.848,40.998 59,44 C59,47.314 56.314,50 53,50 C51.608,49.983 50.263,49.52 49.183,48.63 C48.912,48.359 48.641,48.088 48.37,47.817 C48.367,47.812 48.364,47.807 48.361,47.803 L37.615,53.943 C37.932,54.579 37.965,55.305 38,56 C38,59.314 35.314,62 32,62 C28.686,62 26,59.314 26,56 C26.003,55.298 26.111,54.592 26.385,53.943 L15.639,47.803 C14.375,49.25 12.903,49.904 11,50 C7.686,50 5,47.314 5,44 C5.088,40.946 7.038,38.714 10,38.11 L10,25.89 C6.983,25.349 5.152,23.002 5,20 C5,16.686 7.686,14 11,14 C12.392,14.017 13.737,14.48 14.817,15.37 C15.088,15.641 15.359,15.912 15.63,16.183 C15.633,16.188 15.636,16.193 15.639,16.197 L26.385,10.057 C26.068,9.421 26.035,8.695 26,8 C26,4.686 28.686,2 32,2 L32,2 z M36.639,35.803 C35.437,37.114 34.687,37.48 33,37.867 L33,50.112 C34.054,50.233 34.983,50.743 35.817,51.37 C36.088,51.641 36.359,51.912 36.63,52.183 C36.633,52.188 36.636,52.193 36.639,52.197 L47.385,46.057 C47.068,45.421 47.035,44.695 47,44 C47.013,43.275 47.146,42.628 47.398,41.951 L36.639,35.803 z M27.361,35.803 L16.615,41.943 C16.932,42.578 16.965,43.305 17,44 C16.997,44.702 16.889,45.408 16.615,46.057 L27.361,52.197 C28.563,50.886 29.313,50.52 31,50.133 L31,37.888 C29.946,37.767 29.017,37.257 28.183,36.63 C27.912,36.359 27.641,36.088 27.37,35.817 C27.367,35.812 27.364,35.807 27.361,35.803 z M48.387,23.787 L48.387,23.787 L37.615,29.943 C37.932,30.578 37.965,31.305 38,32 C37.997,32.702 37.889,33.408 37.615,34.057 L48.386,40.212 C49.282,39.051 50.609,38.448 52,38.11 L52,25.89 C50.553,25.643 49.318,24.908 48.387,23.787 L48.387,23.787 z M15.639,23.803 C14.437,25.114 13.687,25.48 12,25.867 L12,38.11 C13.718,38.392 14.457,39.009 15.639,40.197 L26.385,34.057 C26.068,33.421 26.035,32.695 26,32 C26.003,31.298 26.111,30.592 26.385,29.943 L15.639,23.803 z M27.361,11.803 L16.615,17.943 C16.932,18.578 16.965,19.305 17,20 C16.997,20.702 16.889,21.408 16.615,22.057 L27.361,28.197 C28.563,26.886 29.313,26.52 31,26.133 L31,13.888 C29.946,13.767 29.017,13.257 28.183,12.63 C27.912,12.359 27.641,12.088 27.37,11.817 L27.361,11.803 z M36.639,11.803 C35.437,13.114 34.687,13.48 33,13.867 L33,26.112 C34.054,26.233 34.983,26.743 35.817,27.37 C36.088,27.641 36.359,27.912 36.63,28.183 C36.633,28.188 36.636,28.193 36.639,28.197 L47.417,22.039 C47.129,21.398 47.06,20.691 47,20 C47.003,19.298 47.111,18.592 47.385,17.943 L36.639,11.803 z" />
    </SvgIcon>
  )
}

export function CircularLayoutIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 96 64"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M48,2 C51.314,2 54,4.686 54,8 C53.979,8.632 53.94,9.288 53.69,9.88 L64.457,16.097 C65.637,14.727 67.223,14.09 69,14 C72.314,14 75,16.686 75,20 C74.912,23.054 72.962,25.286 70,25.89 L70,38.11 C73.017,38.651 74.848,40.998 75,44 C75,47.314 72.314,50 69,50 C67.604,49.986 66.268,49.515 65.183,48.63 C64.918,48.413 64.698,48.145 64.456,47.902 L53.689,54.119 C53.959,54.707 53.968,55.369 54,56 C54,59.314 51.314,62 48,62 C44.686,62 42,59.314 42,56 C42.02,55.367 42.061,54.711 42.311,54.119 L31.544,47.902 C30.363,49.273 28.778,49.91 27,50 C23.686,50 21,47.314 21,44 C21.088,40.946 23.038,38.714 26,38.11 L26,25.89 C22.983,25.349 21.152,23.002 21,20 C21,16.686 23.686,14 27,14 C30.314,14 33,16.686 33,20 C32.912,23.054 30.962,25.286 28,25.89 L28,38.11 C29.39,38.358 30.867,39.053 31.685,40.265 L63.353,21.981 C63.055,21.367 63.034,20.667 63,20 C63,19.211 63.13,18.546 63.438,17.818 L52.746,11.645 C51.68,13.209 49.816,13.908 48,14 C44.686,14 42,11.314 42,8 C42,4.686 44.686,2 48,2 z M64.315,23.735 L32.647,42.019 C32.944,42.628 28.966,43.333 33,44 C33,44.788 32.87,45.453 32.563,46.181 L43.255,52.354 C44.321,50.791 46.184,50.092 48,50 C48.808,50.002 49.45,50.129 50.197,50.444 L65.131,24.577 C64.347,23.793 64.571,24.114 64.315,23.735 z M66.861,25.58 L51.915,51.468 C52.678,52.232 52.441,51.904 52.745,52.354 L63.437,46.181 C63.089,45.509 63.037,44.741 63,44 C63.088,40.946 65.038,38.714 68,38.11 L68,25.889 C67.198,25.732 67.576,25.839 66.861,25.58 z" />
    </SvgIcon>
  )
}

export function ClusteredLayoutIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 96 64"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M73,6 C76.314,6 79,8.686 79,12 C79,15.314 76.314,18 73,18 C72.216,17.96 72.145,17.988 71.216,17.73 C71.011,17.674 70.825,17.565 70.629,17.482 L64.05,27.604 C65.345,28.744 65.915,30.312 66,32 C65.929,33.918 65.389,35.058 64.05,36.396 L70.629,46.518 C71.359,46.124 72.187,46.041 73,46 C76.314,46 79,48.686 79,52 C79,55.314 76.314,58 73,58 C69.686,58 67,55.314 67,52 C67.071,50.082 67.611,48.942 68.95,47.604 L62.371,37.482 C61.641,37.876 60.813,37.959 60,38 C56.946,37.912 54.714,35.962 54.11,33 L41.89,33 C41.349,36.017 39.002,37.848 36,38 C35.216,37.96 35.145,37.988 34.216,37.73 C34.011,37.674 33.825,37.565 33.629,37.482 L27.05,47.604 C28.345,48.744 28.915,50.312 29,52 C29,55.314 26.314,58 23,58 C19.686,58 17,55.314 17,52 C17.071,50.082 17.611,48.942 18.95,47.604 L12.371,37.482 C11.641,37.876 10.813,37.959 10,38 C6.686,38 4,35.314 4,32 C4,28.686 6.686,26 10,26 C10.784,26.04 10.855,26.012 11.784,26.27 C11.989,26.326 12.175,26.435 12.371,26.518 L18.95,16.396 C17.655,15.256 17.085,13.688 17,12 C17,8.686 19.686,6 23,6 C26.314,6 29,8.686 29,12 C28.929,13.918 28.389,15.058 27.05,16.396 L33.629,26.518 C34.359,26.124 35.187,26.041 36,26 C39.054,26.088 41.286,28.038 41.89,31 L54.11,31 C54.651,27.983 56.998,26.152 60,26 C60.784,26.04 60.855,26.012 61.784,26.27 C61.989,26.326 62.175,26.435 62.371,26.518 L68.95,16.396 C67.655,15.256 67.085,13.688 67,12 C67,8.686 69.686,6 73,6 z M25.371,17.482 C24.641,17.876 23.813,17.959 23,18 C22.216,17.96 22.145,17.988 21.216,17.73 C21.011,17.674 20.825,17.565 20.629,17.482 L14.05,27.604 C15.345,28.744 15.915,30.312 16,32 C15.929,33.918 15.389,35.058 14.05,36.396 L20.629,46.518 C21.359,46.124 22.187,46.041 23,46 C23.784,46.04 23.855,46.012 24.784,46.27 C24.989,46.326 25.175,46.435 25.371,46.518 L31.95,36.396 C30.655,35.256 30.085,33.688 30,32 C30.071,30.082 30.611,28.942 31.95,27.604 L25.371,17.482 z" />
    </SvgIcon>
  )
}

export function HierarchicalLayoutIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 96 64"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M48,8 C51.314,8 54,10.686 54,14 C53.977,15.075 53.737,16.176 53.128,17.078 L65.161,27.392 C66.193,26.424 67.634,26.069 69,26 C72.314,26 75,28.686 75,32 C74.994,33.407 74.5,34.717 73.63,35.817 C73.475,36.013 73.276,36.17 73.1,36.347 L78.565,44.545 C79.315,44.136 80.163,44.042 81,44 C84.314,44 87,46.686 87,50 C87,53.314 84.314,56 81,56 C77.686,56 75,53.314 75,50 C75.006,48.593 75.5,47.283 76.37,46.183 C76.525,45.987 76.724,45.83 76.9,45.653 L71.435,37.455 C70.685,37.864 69.837,37.958 69,38 C68.226,37.961 68.125,37.987 67.216,37.73 C66.989,37.666 66.782,37.547 66.565,37.455 L61.1,45.653 C62.369,46.78 62.916,48.342 63,50 C63,53.314 60.314,56 57,56 C53.686,56 51,53.314 51,50 C51,46.686 53.686,44 57,44 C57.774,44.039 57.875,44.013 58.784,44.27 C59.011,44.334 59.218,44.453 59.435,44.545 L64.9,36.347 C63.631,35.22 63.084,33.658 63,32 C63.023,30.925 63.263,29.824 63.872,28.921 L51.839,18.608 C50.807,19.576 49.366,19.931 48,20 C46.73,19.97 45.085,19.531 44.161,18.608 L32.128,28.921 C32.762,29.822 32.946,30.928 33,32 C32.994,33.407 32.5,34.717 31.63,35.817 C31.475,36.013 31.276,36.17 31.1,36.347 L36.565,44.545 C37.315,44.136 38.163,44.042 39,44 C42.314,44 45,46.686 45,50 C45,53.314 42.314,56 39,56 C35.686,56 33,53.314 33,50 C33.006,48.593 33.5,47.283 34.37,46.183 C34.525,45.987 34.724,45.83 34.9,45.653 L29.435,37.455 C28.685,37.864 27.837,37.958 27,38 C26.226,37.961 26.125,37.987 25.216,37.73 C24.989,37.666 24.782,37.547 24.565,37.455 L19.1,45.653 C20.369,46.78 20.916,48.342 21,50 C21,53.314 18.314,56 15,56 C11.686,56 9,53.314 9,50 C9,46.686 11.686,44 15,44 C15.774,44.039 15.875,44.013 16.784,44.27 C17.011,44.334 17.218,44.453 17.435,44.545 L22.9,36.347 C21.631,35.22 21.084,33.658 21,32 C21,28.686 23.686,26 27,26 C28.27,26.03 29.915,26.469 30.839,27.392 L42.872,17.079 C42.238,16.178 42.054,15.072 42,14 C42,10.686 44.686,8 48,8 L48,8 z" />
    </SvgIcon>
  )
}

/* ====[ OTHER ICONS ]======================================================================== */

export function AddNodeIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M22,18 L22,16 L18,16 L18,12 L16,12 L16,16 L12,16 L12,18 L16,18 L16,22 L18,22 L18,18 L22,18 z" />
      <path d="M8.5,15 C4.91,15 2,12.09 2,8.5 C2,4.91 4.91,2 8.5,2 C12.09,2 15,4.91 15,8.5 C15,12.09 12.09,15 8.5,15 z" />
    </SvgIcon>
  )
}

export function DrawEdgeIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M8,2 L8,4 L14.59,4 L3,15.59 L4.41,17 L16,5.41 L16,12 L18,12 L18,2 z" />
      <path d="M18,18 L18,16 L14,16 L14,12 L12,12 L12,16 L8,16 L8,18 L12,18 L12,22 L14,22 L14,18 L18,18 z" />
    </SvgIcon>
  )
}

export function NodeLabelIcon(props: IconProps): React.ReactElement {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={props.sx ?? defaultIconStyle.sx}
      style={props.style ?? defaultIconStyle.style}
    >
      <path d="M12,2 C17.523,2 22,6.477 22,12 C22,17.523 17.523,22 12,22 C6.477,22 2,17.523 2,12 C2,6.477 6.477,2 12,2 z M17.2,5.75 L6.8,5.75 C6.425,5.75 6.121,6.054 6.121,6.428 L6.121,9 C6.121,9.375 6.425,9.679 6.8,9.678 L7.751,9.678 C8.126,9.679 8.429,9.375 8.429,9 L8.429,7.964 L10.739,7.964 L10.739,16.035 L10.071,16.036 C9.697,16.036 9.393,16.34 9.393,16.714 L9.393,17.571 C9.393,17.946 9.697,18.25 10.071,18.25 L13.928,18.25 C14.303,18.25 14.607,17.946 14.607,17.571 L14.607,16.714 C14.607,16.34 14.303,16.036 13.928,16.035 L13.261,16.035 L13.261,7.964 L15.571,7.964 L15.571,9 C15.571,9.375 15.874,9.679 16.249,9.678 L17.2,9.678 C17.575,9.679 17.879,9.375 17.878,9 L17.878,6.428 C17.879,6.054 17.575,5.75 17.2,5.75 z" />
    </SvgIcon>
  )
}

/* ====[ NODE SHAPES ]======================================================================== */

export function DiamondIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M16,-0 L32,16 L16,32 L-0,16 L16,-0 z" />
    </SvgIcon>
  )
}

export function EllipseIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M16,32 C7.163,32 -0,24.837 -0,16 C-0,7.163 7.163,-0 16,-0 C24.837,-0 32,7.163 32,16 C32,24.837 24.837,32 16,32 z" />
    </SvgIcon>
  )
}

export function HexagonIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M7.917,32 L-0.166,16 L7.917,0 L24.083,0 L32.166,16 L24.083,32 z" />
    </SvgIcon>
  )
}

export function OctagonIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M9.373,32 L0,22.627 L0,9.373 L9.373,0 L22.627,-0 L32,9.373 L32,22.627 L22.627,32 z" />
    </SvgIcon>
  )
}

export function RectangleIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M0,0 L32,0 L32,32 L0,32 L0,0 z" />
    </SvgIcon>
  )
}

export function ParallelogramIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M21.68,0 L-0,0 L10.32,32 L32,32 L21.68,0 z" />
    </SvgIcon>
  )
}

export function RoundRectangleIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M8,-0 L24,-0 C28.418,-0 32,3.582 32,8 L32,24 C32,28.418 28.418,32 24,32 L8,32 C3.582,32 -0,28.418 -0,24 L-0,8 C-0,3.582 3.582,-0 8,-0 z" />
    </SvgIcon>
  )
}

export function TriangleIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M0,32 L16,-0 L32,32 z" />
    </SvgIcon>
  )
}

export function VeeIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M32,0 L16,32 L0,0 L32,0 z M32,0 L0,0 L16,11 L32,0 z" />
    </SvgIcon>
  )
}

/* ====[ ARROW SHAPES ]======================================================================= */

export function CircleArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M24,8 C28.418,8 32,11.582 32,16 C32,20.418 28.418,24 24,24 C20.159,23.988 16.913,21.231 16.15,17.5 L0,17.5 L0,14.5 L16.15,14.5 C16.893,10.658 20.138,8.098 24,8 z" />
    </SvgIcon>
  )
}

export function DiamondArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M24,8 L32,16 L24,24 L17.5,17.5 L-0,17.5 L-0,14.5 L17.5,14.5 L24,8 z" />
    </SvgIcon>
  )
}

export function NoneArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M-0,14.5 L32,14.5 L32,17.5 L-0,17.5 L-0,14.5 z" />
    </SvgIcon>
  )
}

export function SquareArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M16,24 L16,17.5 L0,17.5 L0,14.5 L16,14.5 L16,8 L32,8 L32,24 L16,24 z" />
    </SvgIcon>
  )
}

export function TeeArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M29,8 L29,24 L24,24 L24,17.5 L0,17.5 L0,14.5 L24,14.5 L24,8 L29,8 z" />
    </SvgIcon>
  )
}

export function TriangleArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M18,8 L32,16 L18,24 L18,17.5 L-0,17.5 L-0,14.5 L18,14.5 L18,8 z" />
    </SvgIcon>
  )
}

export function TriangleCrossArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M13.5,8 L13.5,14.5 L18,14.5 L18,8 L32,16 L18,24 L18,17.5 L13.5,17.5 L13.5,24 L10.5,24 L10.5,17.5 L0,17.5 L0,14.5 L10.5,14.5 L10.5,8 L13.5,8 z" />
    </SvgIcon>
  )
}

export function OpenTriangleCrossArrowIcon(
  props: IconProps,
): React.ReactElement {
  const { sx, style, isSelected } = props

  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path
        d="M13.5,8 L13.5,14.5 L18,14.5 L18,8 L32,16 L18,24 L18,17.5 L13.5,17.5 L13.5,24 L10.5,24 L10.5,17.5 L0,17.5 L0,14.5 L10.5,14.5 L10.5,8 L13.5,8 z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </SvgIcon>
  )
}

export function OpenCircleArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props

  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path
        d="M24,8 C28.418,8 32,11.582 32,16 C32,20.418 28.418,24 24,24 C20.159,23.988 16.913,21.231 16.15,17.5 L0,17.5 L0,14.5 L16.15,14.5 C16.893,10.658 20.138,8.098 24,8 z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </SvgIcon>
  )
}

export function OpenDiamondArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props

  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path
        d="M24,8 L32,16 L24,24 L17.5,17.5 L-0,17.5 L-0,14.5 L17.5,14.5 L24,8 z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </SvgIcon>
  )
}

export function OpenSquareArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props

  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path
        d="M8,8 L24,8 L24,24 L8,24 L8,8 z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </SvgIcon>
  )
}

export function OpenTriangleArrowIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path
        d="M18,8 L32,16 L18,24 L18,17.5 L-0,17.5 L-0,14.5 L18,14.5 L18,8 z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </SvgIcon>
  )
}

/* ====[ LINE STYLES ]======================================================================== */

export function DashedLineIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M29.789,0.09 L31.91,2.211 L24.839,9.282 L22.718,7.161 L29.789,0.09 z" />
      <path d="M7.161,22.718 L9.282,24.839 L2.211,31.91 L0.09,29.789 L7.161,22.718 z" />
      <path d="M18.475,11.404 L20.596,13.525 L13.525,20.596 L11.404,18.475 L18.475,11.404 z" />
    </SvgIcon>
  )
}

export function DottedLineIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M3.272,26.607 L5.393,28.728 L3.272,30.849 L1.151,28.728 L3.272,26.607 z" />
      <path d="M7.515,22.364 L9.636,24.485 L7.515,26.607 L5.393,24.485 L7.515,22.364 z" />
      <path d="M11.757,18.121 L13.879,20.243 L11.757,22.364 L9.636,20.243 L11.757,18.121 z" />
      <path d="M16,13.879 L18.121,16 L16,18.121 L13.879,16 L16,13.879 z" />
      <path d="M20.243,9.636 L22.364,11.757 L20.243,13.879 L18.121,11.757 L20.243,9.636 z" />
      <path d="M24.485,5.393 L26.607,7.515 L24.485,9.636 L22.364,7.515 L24.485,5.393 z" />
      <path d="M28.728,1.151 L30.849,3.272 L28.728,5.393 L26.607,3.272 L28.728,1.151 z" />
    </SvgIcon>
  )
}

export function SolidLineIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M0.09,29.789 L29.789,0.09 L31.91,2.211 L2.211,31.91 L0.09,29.789 z" />
    </SvgIcon>
  )
}

export function DoubleLineIcon(props: IconProps): React.ReactElement {
  const { sx, style, isSelected } = props
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        ...(sx ?? defaultIconStyle.sx),
        transform: isSelected ? 'scale(1.1)' : 'none',
      }}
      style={style ?? defaultIconStyle.style}
    >
      <path d="M-5.09,24.789 L24.789,-5.09 26.91,-3.211 L-3.211,26.91 L-5.09,24.789 z" />
      <path d="M5.09,34.789 L34.789,5.09 L36.91,7.211 L7.211,36.91 L5.09,34.789 z" />
    </SvgIcon>
  )
}

export function PassthroughMappingFunctionIcon(
  props: IconProps,
): React.ReactElement {
  return (
    <img
      style={{ width: 20, height: 20 }}
      src={passthroughMappingFunctionIcon}
    />
  )
}

export function DiscreteMappingFunctionIcon(
  props: IconProps,
): React.ReactElement {
  return (
    <img style={{ width: 20, height: 20 }} src={discreteMappingFunctionIcon} />
  )
}

export function ContinuousMappingFunctionIcon(
  props: IconProps,
): React.ReactElement {
  return (
    <img
      style={{ width: 20, height: 20 }}
      src={continuousMappingFunctionIcon}
    />
  )
}
