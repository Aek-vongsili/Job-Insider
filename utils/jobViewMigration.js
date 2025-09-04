/**
 * Database Migration Utility for Job Views
 * 
 * This utility helps migrate existing job records to include view counts
 */

import firebase from '../firebase/fbConfig';

export const migrateJobViews = async () => {
  try {
    const db = firebase.firestore();
    const jobsRef = db.collection('jobs');
    
    // Get all jobs that don't have a views field
    const snapshot = await jobsRef.get();
    const batch = db.batch();
    let updateCount = 0;
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      // If the job doesn't have a views field, add it with value 0
      if (!data.hasOwnProperty('views')) {
        batch.update(doc.ref, { views: 0 });
        updateCount++;
      }
    });
    
    if (updateCount > 0) {
      await batch.commit();
      console.log(`Successfully migrated ${updateCount} jobs to include view counts`);
    } else {
      console.log('All jobs already have view counts');
    }
    
    return { success: true, updated: updateCount };
  } catch (error) {
    console.error('Error migrating job views:', error);
    return { success: false, error: error.message };
  }
};

// Function to get jobs with highest view counts
export const getPopularJobs = async (limit = 10) => {
  try {
    const db = firebase.firestore();
    const snapshot = await db.collection('jobs')
      .orderBy('views', 'desc')
      .limit(limit)
      .get();
    
    const popularJobs = [];
    snapshot.forEach((doc) => {
      popularJobs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return popularJobs;
  } catch (error) {
    console.error('Error getting popular jobs:', error);
    return [];
  }
};

// Function to get view statistics
export const getViewStatistics = async () => {
  try {
    const db = firebase.firestore();
    const snapshot = await db.collection('jobs').get();
    
    let totalViews = 0;
    let jobCount = 0;
    let maxViews = 0;
    let minViews = Infinity;
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const views = data.views || 0;
      
      totalViews += views;
      jobCount++;
      maxViews = Math.max(maxViews, views);
      minViews = Math.min(minViews, views);
    });
    
    const averageViews = jobCount > 0 ? totalViews / jobCount : 0;
    
    return {
      totalViews,
      jobCount,
      averageViews: Math.round(averageViews * 100) / 100,
      maxViews,
      minViews: minViews === Infinity ? 0 : minViews
    };
  } catch (error) {
    console.error('Error getting view statistics:', error);
    return null;
  }
};
