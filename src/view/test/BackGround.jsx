import React from 'react'

export default function BackGround () {
  return (
    <div>
      <div className='absolute h-screen overflow-hidden top-0 inset-0 pointer-events-none'>
        {/* Large blurred shapes for depth */}
        <div className='absolute top-10 right-1/ w-screen h-96 bg-gradient-to-br from-blue-100/10 to-sky-200/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 right-1/ w-screen h-96 bg-gradient-to-br from-blue-100/1 to-sky-200/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-purple-200/20 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 right-10 w-64 h-64 bg-gradient-to-br from-green-100/15 to-teal-200/15 rounded-full blur-2xl'></div>
        {/* Subtle grid overlay */}
        <div
          className='absolute inset-0 opacity-5'
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      {/*  Background Elements */}
      <div
        className='absolute inset-0 opacity-20 pointer-events-none'
        aria-hidden='true'
      >
        {/* Mathematical formulas - Light blue accent */}
        <div className='absolute top-20 left-10 text-[#8AB4F8] font-mono text-lg font-semibold transform rotate-12 hover:scale-110 transition-transform duration-300 hidden md:block'>
          x + y = z
        </div>
        <div className='absolute top-32 right-20 text-[#8AB4F8] font-mono text-xl font-bold transform -rotate-6 hover:scale-110 transition-transform duration-300 hidden lg:block'>
          f(x) = x²
        </div>
        <div className='absolute bottom-40 left-20 text-slate-600 font-mono text-lg font-semibold transform rotate-6 hover:scale-110 transition-transform duration-300 hidden md:block'>
          101010
        </div>
        <div className='absolute top-60 left-1/4 text-[#98C379] font-mono text-base font-medium transform -rotate-12 hover:scale-110 transition-transform duration-300 hidden lg:block'>
          if (condition) {'{'}
        </div>
        <div className='absolute bottom-60 right-1/4 text-slate-600 font-mono text-lg font-bold transform rotate-8 hover:scale-110 transition-transform duration-300 hidden md:block'>
          &lt;/&gt;
        </div>

        {/* Educational symbols with glow effects */}
        <div className='absolute top-40 right-1/3'>
          {/* Glow effect behind the icon */}
          <div className='absolute text-amber-500 text-2xl transform rotate-45 blur-sm opacity-50'>
            💡
          </div>
          {/* Main icon */}
          <div className='relative text-amber-500 text-2xl transform rotate-45 hover:rotate-90 transition-transform duration-500'>
            💡
          </div>
        </div>
        <div className='absolute bottom-32 left-1/2'>
          {/* Glow effect behind the icon */}
          <div className='absolute text-orange-500 text-xl transform -rotate-12 blur-sm opacity-50'>
            📚
          </div>
          {/* Main icon */}
          <div className='relative text-orange-500 text-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500'>
            📚
          </div>
        </div>
        <div className='absolute top-80 right-10 text-blue-500 text-lg transform rotate-12 hover:rotate-0 transition-transform duration-500 hidden md:block'>
          🎓
        </div>

        {/* Enhanced code snippets with color variation */}
        <div className='absolute top-52 left-16 text-[#98C379] font-mono text-sm font-medium transform rotate-3 hover:scale-110 transition-transform duration-300 hidden lg:block'>
          console.log(&apos;Hello&apos;)
        </div>
        <div className='absolute bottom-20 right-32 text-[#8AB4F8] font-mono text-base font-semibold transform -rotate-8 hover:scale-110 transition-transform duration-300 hidden md:block'>
          SELECT * FROM users
        </div>
        <div className='absolute top-52 right-1/3 text-[#8AB4F8] font-mono text-lg font-bold transform rotate-15 hover:scale-110 transition-transform duration-300 hidden lg:block'>
          √(a² + b²)
        </div>

        {/* Additional modern code elements - Mobile responsive */}
        <div className='absolute bottom-80 left-1/3 text-[#98C379] font-mono text-sm font-medium transform -rotate-6 hover:scale-110 transition-transform duration-300 hidden lg:block'>
          while(learning) {'{'}
        </div>
        <div className='absolute top-28 left-2/3 text-[#8AB4F8] font-mono text-base font-semibold transform rotate-9 hover:scale-110 transition-transform duration-300 hidden md:block'>
          π ≈ 3.14159
        </div>
        <div className='absolute bottom-52 right-16 text-[#98C379] font-mono text-lg font-medium transform -rotate-3 hover:scale-110 transition-transform duration-300 hidden md:block'>
          {'{'} success: true {'}'}
        </div>

        {/* Additional tech elements - Hidden on mobile for cleaner look */}
        <div className='absolute top-72 left-1/2 text-slate-500 font-mono text-xs font-light transform rotate-12 hover:scale-110 transition-transform duration-300 hidden xl:block'>
          npm install
        </div>
        <div className='absolute bottom-96 right-1/2 text-slate-600 font-mono text-sm font-medium transform -rotate-9 hover:scale-110 transition-transform duration-300 hidden xl:block'>
          git commit -m
        </div>
        <div className='absolute top-16 right-1/4 text-slate-500 font-mono text-xs transform rotate-6 hover:scale-110 transition-transform duration-300 hidden lg:block'>
          const learn = () =&gt;
        </div>

        {/* Mobile-only simplified elements */}
        <div className='absolute top-20 right-10 text-[#8AB4F8] font-mono text-base font-semibold transform rotate-12 md:hidden'>
          f(x)
        </div>
        <div className='absolute bottom-20 left-10 text-[#98C379] font-mono text-sm font-medium transform -rotate-6 md:hidden'>
          {'{'} code {'}'}
        </div>
      </div>
    </div>
  )
}
