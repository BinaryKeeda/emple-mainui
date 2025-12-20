import React from 'react'

export default function Coin() {
    return (
        <>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="30" height="30">
            <defs>
                <linearGradient id="lg" x1="0" x2="1">
                    <stop offset="0" stop-color="#fff4d6" />
                    <stop offset="1" stop-color="#ffd14d" />
                </linearGradient>
            </defs>

            <circle cx="64" cy="64" r="60" fill="#b88700" />
            <circle cx="64" cy="64" r="52" fill="url(#lg)" />

            <g transform="translate(64,57) scale(2.4)">
                <text x="0" y="10" text-anchor="middle" font-size="20" font-family="Inter, Arial"
                    fill="#7a3f00" font-weight="900">
                    BK
                </text>
            </g>
        </svg></>
    )
}
