import { createFeature, createReducer, on } from '@ngrx/store';
import { GetCourseResponseInterface, CourseInterface } from './homepage.interface';
import { GetCourseActions } from './homepage.actions';

// Define the initial state interface
export interface GetCourseState {
  isLoading: boolean; // Indicates if the data is being fetched
  courses: CourseInterface[] | null; // Holds the list of courses
  error: string | null; // Holds the error message if fetching fails
}

// Initial state of the reducer
const initialState: GetCourseState = {
  isLoading: false,
  courses: null,
  error: null,
};

// Create the reducer using NGRX utilities
export const getCourseFeature = createFeature({
  name: 'getcourse',
  reducer: createReducer(
    initialState,
    
    // Handle Get Course action
    on(GetCourseActions.getCourse, (state) => ({
      ...state,
      isLoading: true, // Set loading to true
      error: null, // Reset error
    })),
    
    // Handle Get Course Success action
    on(GetCourseActions.getCourseSuccess, (state, { getCourseResponse }) => ({
      ...state,
      isLoading: false, // Set loading to false
      courses: getCourseResponse.data, // Store the fetched courses
      error: null, // Clear any previous error
    })),
    
    // Handle Get Course Failure action
    on(GetCourseActions.getCourseFailure, (state, { getCourseErrorResponse }) => ({
      ...state,
      isLoading: false, // Set loading to false
      error: getCourseErrorResponse.message, // Store the error message
    }))
  ),
});

// Export selectors for use in components
export const {
  name: getCourseFeatureKey,
  reducer: getCourseReducer,
  selectIsLoading, // Selector for loading state
  selectCourses, // Selector for courses
  selectError, // Selector for error message
} = getCourseFeature;
