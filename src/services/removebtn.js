export const removeBook = async (isbn) => {
    try {
      const response = await fetch(`https://book-backend-odmd.onrender.com/api/remove/${isbn}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove the book');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error removing book:', error);
      throw error;
    }
  };
  
