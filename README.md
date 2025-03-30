# Data Table with Drag-and-Drop, Sorting, Filtering, and CSV Export  

## 1. Overview  
This project is a **dynamic and interactive data table** built using **React.js**. It includes the following features:  
- **Drag-and-Drop Column Reordering** (using `react-beautiful-dnd`)  
- **Sorting** (Ascending/Descending order for each column)  
- **Filtering** (Real-time input-based filtering)  
- **CSV Export** (Download filtered data as a CSV file)  
- **Data Visualization** (In different formats like bar chart, pie chart etc)
- **EmailJS** (For Sending Results through mail)

## 2. Tech Stack and Dependencies  
### **Framework**  
- **React.js** (Frontend)  

### **Major Libraries Used**  
| Library | Purpose |
|---------|---------|
| `react-beautiful-dnd` | Enables drag-and-drop functionality for column reordering |
| `useState`, `useEffect` | React hooks for state management and lifecycle handling |
| `Blob API` | Used for CSV file export functionality |
| `recharts` | Used for Visualization of data in form of graphs,charts |
| `react-icons` | Used for some logos (github , sql etc) |


## 3. Page Load Time
### **The page load time was measured using Chrome DevTools and Lighthouse performance audits.** 
- **Report** https://drive.google.com/file/d/1VUcFFXXdcNCDvuWffvHpeFjKZbHdVxS2/view?usp=sharing

## 4. Optimizations for Performance

   **-Code Splitting & Lazy Loading: Implemented React.lazy() for dynamically loading components.**

   **-Optimized CSS & Assets: Minified CSS and used SVG icons to reduce file size.**

   **-Memoization & Use of React Hooks: Utilized useMemo() and useCallback() to prevent unnecessary re-renders.**

   **-Efficient State Management: Used useState and useReducer optimally to manage state efficiently.**

   **-Reduced HTTP Requests: Minimized external API calls and optimized the JSON data for visualization.**


### **Installation & Setup**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/Manideep-422105/Internship-Task.git
   cd frontend
   npm run start
