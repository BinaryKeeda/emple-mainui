import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll'
import { useUser } from "../../context/UserContext";

export default function Hero() {
    // const { user } = useSelector(s => s.auth)
    const { user } = useUser();
    return (
        <section id="home" className="relative h-[calc(100vh-140px)] min-h-[750px] md:min-h-0 w-full overflow-hidden" >
            {/* Layered Background Elements */}
            {/* Abstract depth layers */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Large blurred shapes for depth */}
                <div className="absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-10 w-64 h-64 bg-gradient-to-br from-green-200/15 to-teal-200/15 rounded-full blur-2xl"></div>
                {/*Subtle grid overlay */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            {/*  Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                {/* Mathematical formulas - Light blue accent */}
                <div className="absolute top-20 left-10 text-[#8AB4F8] font-mono text-lg font-semibold transform rotate-12 hover:scale-110 transition-transform duration-300 hidden md:block">
                    x + y = z
                </div>
                <div className="absolute top-32 right-20 text-[#8AB4F8] font-mono text-xl font-bold transform -rotate-6 hover:scale-110 transition-transform duration-300 hidden lg:block">
                    f(x) = x²
                </div>
                <div className="absolute bottom-40 left-20 text-slate-600 font-mono text-lg font-semibold transform rotate-6 hover:scale-110 transition-transform duration-300 hidden md:block">
                    101010
                </div>
                <div className="absolute top-60 left-1/4 text-[#98C379] font-mono text-base font-medium transform -rotate-12 hover:scale-110 transition-transform duration-300 hidden lg:block">
                    if (condition) {'{'}
                </div>
                <div className="absolute bottom-60 right-1/4 text-slate-600 font-mono text-lg font-bold transform rotate-8 hover:scale-110 transition-transform duration-300 hidden md:block">
                    &lt;/&gt;
                </div>
                
                {/* Educational symbols with glow effects */}
                <div className="absolute top-40 right-1/3">
                    {/* Glow effect behind the icon */}
                    <div className="absolute text-amber-500 text-2xl transform rotate-45 blur-sm opacity-50">
                        💡
                    </div>
                    {/* Main icon */}
                    <div className="relative text-amber-500 text-2xl transform rotate-45 hover:rotate-90 transition-transform duration-500">
                        💡
                    </div>
                </div>
                <div className="absolute bottom-32 left-1/2">
                    {/* Glow effect behind the icon */}
                    <div className="absolute text-orange-500 text-xl transform -rotate-12 blur-sm opacity-50">
                        📚
                    </div>
                    {/* Main icon */}
                    <div className="relative text-orange-500 text-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                        📚
                    </div>
                </div>
                <div className="absolute top-80 right-10 text-blue-500 text-lg transform rotate-12 hover:rotate-0 transition-transform duration-500 hidden md:block">
                    🎓
                </div>
                
                {/* Enhanced code snippets with color variation */}
                <div className="absolute top-52 left-16 text-[#98C379] font-mono text-sm font-medium transform rotate-3 hover:scale-110 transition-transform duration-300 hidden lg:block">
                    console.log(&apos;Hello&apos;)
                </div>
                <div className="absolute bottom-20 right-32 text-[#8AB4F8] font-mono text-base font-semibold transform -rotate-8 hover:scale-110 transition-transform duration-300 hidden md:block">
                    SELECT * FROM users
                </div>
                <div className="absolute top-52 right-1/3 text-[#8AB4F8] font-mono text-lg font-bold transform rotate-15 hover:scale-110 transition-transform duration-300 hidden lg:block">
                    √(a² + b²)
                </div>
                
                {/* Additional modern code elements - Mobile responsive */}
                <div className="absolute bottom-80 left-1/3 text-[#98C379] font-mono text-sm font-medium transform -rotate-6 hover:scale-110 transition-transform duration-300 hidden lg:block">
                    while(learning) {'{'}
                </div>
                <div className="absolute top-28 left-2/3 text-[#8AB4F8] font-mono text-base font-semibold transform rotate-9 hover:scale-110 transition-transform duration-300 hidden md:block">
                    π ≈ 3.14159
                </div>
                <div className="absolute bottom-52 right-16 text-[#98C379] font-mono text-lg font-medium transform -rotate-3 hover:scale-110 transition-transform duration-300 hidden md:block">
                    {'{'} success: true {'}'}
                </div>
                
                {/* Additional tech elements - Hidden on mobile for cleaner look */}
                <div className="absolute top-72 left-1/2 text-slate-500 font-mono text-xs font-light transform rotate-12 hover:scale-110 transition-transform duration-300 hidden xl:block">
                    npm install
                </div>
                <div className="absolute bottom-96 right-1/2 text-slate-600 font-mono text-sm font-medium transform -rotate-9 hover:scale-110 transition-transform duration-300 hidden xl:block">
                    git commit -m
                </div>
                <div className="absolute top-16 right-1/4 text-slate-500 font-mono text-xs transform rotate-6 hover:scale-110 transition-transform duration-300 hidden lg:block">
                    const learn = () =&gt;
                </div>
                
                {/* Mobile-only simplified elements */}
                <div className="absolute top-20 right-10 text-[#8AB4F8] font-mono text-base font-semibold transform rotate-12 md:hidden">
                    f(x)
                </div>
                <div className="absolute bottom-20 left-10 text-[#98C379] font-mono text-sm font-medium transform -rotate-6 md:hidden">
                    {'{'} code {'}'}
                </div>
            </div>

            <div className="flex flex-col md:flex-row h-full items-center justify-center px-6 md:px-8 max-w-7xl mx-auto relative z-10 gap-8 md:gap-0 ">
                {/* Hero Image - Shows first on mobile */}
                <div className="flex justify-center md:justify-start order-1 md:order-2 md:flex-[.7]">
                    <img src="./assets/hero/hero.png" alt="BinaryKeeda learning platform - Student studying with modern educational tools and coding interfaces"
                        className="w-64 md:w-80 lg:w-96 xl:w-[450px] h-64 md:h-80 lg:h-96 xl:h-[450px] object-contain drop-shadow-lg select-none"
                        draggable="false" />
                </div>

                {/* Text Content - Shows second on mobile */}
                <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1 md:flex-1">
                    {/* Announcement Badge */}
                    <div className="mb-4 hidden md:block">
                        <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full border border-orange-200">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                            🚀 Start Your Learning Journey Today
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
                        Master Your Skills with
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> BinaryKeeda</span>
                    </h1>
                    <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed mx-auto md:mx-0">
                        Excel in coding, aptitude, reasoning, and core subjects with expert-curated quizzes and interactive challenges designed for your success.
                    </p>
                    {/* Feature highlights */}
                    <div className="mt-6 hidden md:flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Expert-curated content
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            Interactive challenges
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            Track your progress
                        </div>
                    </div>

                    <div className="mt-6 md:mt-8 flex gap-4 justify-center md:justify-start items-center md:items-start">
                            <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ca5a27] to-[#e67e22] px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out hover:animate-none"
                                style={{
                                    animation: 'gentle-float 2.5s ease-in-out infinite'
                                }}>
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Learning
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#e67e22] to-[#ca5a27] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        <ScrollLink to="about" smooth duration={1000} className="cursor-pointer"> 
                            <button className="group relative overflow-hidden rounded-lg border border-orange-600 px-8 py-3 text-orange-600 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out hover:bg-orange-50">
                                <span className="relative z-10 flex items-center gap-2">
                                    Learn More
                                </span>
                            </button>
                        </ScrollLink>
                    </div>
                </div>
            </div>
        </section>
    );
}






{/* 
    <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-[#000] via-black to-gray-900  z-30"></div>

    
        className="h-full w-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        src="https://res.cloudinary.com/drzyrq7d5/video/upload/v1742219333/binarykeeda/rvdq564zixtqjspvqeql.mp4"
        aria-hidden="true"
    />

    {
    <div className="absolute inset-0 flex flex-col items-start justify-center text-start text-white px-10 z-40">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-2xl">
            Master Your Skills with BinaryKeeda
        </h1>
        <p className="mt-4 text-lg text-start md:text-xl max-w-2xl">
            Learn, practice, and excel in coding, aptitude, reasoning, and core subjects with expert-curated quizzes and challenges.
        </p>
        <Link to={user ? `/${user.role}` : '/login'} className="mt-7">
            <button className="rounded-md bg-[#ca5a27] py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-white hover:opacity-80 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Start Learning
            </button>
        </Link>
    </div>
*/}
