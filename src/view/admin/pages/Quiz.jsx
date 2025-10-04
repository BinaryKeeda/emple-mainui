// import React, { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import axios from "axios";
// import { Box, Button, Typography, InputAdornment, InputLabel, FormControl, Input, IconButton, } from "@mui/material";
// import { Edit, Refresh, Search } from "@mui/icons-material";
// import LoadingModal from "../../utils/Loader";
// import { Link, Navigate } from "react-router-dom";
// const Addquiz = React.lazy(() => import("../../modals/Addquiz"));

// export default function InfiniteScrollWithMongo() {
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [newQuiz, setNewQuiz] = useState({ title: "", description: "" });

//   // Fetch Items
//   const fetchItems = async (fetchLimit) => {
//     try {
//       const limit = fetchLimit || 9;
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/api/quiz/get?page=${page}&limit=${limit}&search=${searchQuery}`
//       );
//       const newItems = response.data.data;

//       setItems((prevItems) => (page === 1 ? newItems : [...prevItems, ...newItems]));
//       setPage((prevPage) => prevPage + 1);

//       if (newItems.length < limit) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };


//   useEffect(() => {
//     setPage(1);
//     setHasMore(true);
//     fetchItems(100);
//   }, [searchQuery]);

//   const handleSearch = () => {
//     setPage(1);
//     // setItems([]);
//     setSearchQuery(searchTerm);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const handleAddQuiz = async () => {
//     setShowModal(true);
//   };

//   return (
//     <>
//       <div className="flex gap-6 justify-between bg-white pr-5"  >
//         <div className="flex items-center gap-3 border-none p-5" >
//           <Box sx={{ '& > :not(style)': { m: 1 } }}>
//             <FormControl variant="standard">
//               <InputLabel htmlFor="input-with-icon-adornment">
//                 Search Quiz
//               </InputLabel>
//               <Input
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyUp={handleKeyPress}
//                 id="input-with-icon-adornment"
//                 startAdornment={
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 }
//               />
//             </FormControl>
//             {/* <TextField
//             fullWidth
          
//             label="Search quizzes..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyUp={handleKeyPress}
//           /> */}
//           </Box>
//           <Button
//             variant="contained" color="primary"
//             sx={{ color: "#f1f1f1", fontWeight: "bold" }}
//             onClick={handleSearch}
//           >
//             Search
//           </Button>
//           <Button
//             variant="contained" color="primary"
//             onClick={handleAddQuiz}
//           >
//             Add New
//           </Button>
//         </div>
//         <div className="items-center flex justify-between" >
//           <div>
//             <IconButton>
//               <Refresh />
//             </IconButton>
//           </div>
//         </div>
//       </div>



//       {/* Infinite Scroll */}
//       <div id="infinite" className="flex items-center w-full min-h-40">
//         <InfiniteScroll
        
//           className="w-full"
//           dataLength={items.length}
//           next={fetchItems}
//           hasMore={hasMore}
//           loader={<Typography align="center">Loading...</Typography>}
//           endMessage={<Typography align="center"></Typography>}
//         >
//           <div className="flex w-full flex-wrap justify-start gap-3">
//             {items && items.length > 0 ? (
//               items.map((item, index) => (
//                 <div key={index} className="max-w-fit">
//                   <Card _id={item._id} title={item.title} createdAt={item.createdAt} updatedAt={item.updatedAt} />
//                 </div>
//               ))
//             ) : (
//               <div className="flex bg-white text-center p-5  w-full">No Quiz Found </div>
//             )}
//           </div>
//         </InfiniteScroll>
//       </div>
//       {
//         showModal &&
//         <React.Suspense fallback={<><LoadingModal /></>} >
//           <Addquiz isHidden={showModal} items={items} setModalClose={setShowModal} />
//         </React.Suspense>
//       }
//     </>
//   );
// }



// const Card = ({ _id, updatedAt, createdAt, title, description = "No Description" }) => {
//   return (
//     <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
//       <div className="p-4">
//         <div className="flex justify-between">
//           <h5 className="text-slate-800 text-xl font-semibold">
//             {title}
//           </h5>
//           <Link to={`/admin/manage/quiz/${_id}`} >
//             <IconButton>
//               <Edit />
//             </IconButton>
//           </Link>
//         </div>
//         <small className="text-slate-600 leading-normal font-light">
//           {description}
//         </small>
//       </div>
//       <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
//         <span className="text-sm text-slate-600 font-medium">
//           Created At: {createdAt}
//         </span><br />
//         <span className="text-sm text-slate-600 font-medium">
//           Last updated: {updatedAt}
//         </span>
//       </div>
//     </div>
//   )
// }

import React from 'react'

export default function Quiz() {
  return (
    <div>Quiz</div>
  )
}
