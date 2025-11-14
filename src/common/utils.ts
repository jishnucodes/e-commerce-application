export const Categories = [
  { id: 1, name: "Women's Fashion", slug: "womens-fashion" },
  { id: 2, name: "Hot Sale", slug: "hot-sale" },
  { id: 3, name: "Headphones", slug: "headphones" },
  { id: 4, name: "Tablets", slug: "tablets" },
  { id: 5, name: "Backpacks", slug: "backpacks" },
  { id: 6, name: "Fashion", slug: "fashion" },
  { id: 7, name: "Watches", slug: "watches" },
  { id: 8, name: "Televisions", slug: "televisions" },
  { id: 9, name: "Mobiles", slug: "mobiles" },
  { id: 10, name: "Electronics", slug: "electronics" },
];

/**
 * Check if user is authenticated by making an API call.
 * Since cookies are HttpOnly, we cannot read them client-side.
 * Instead, we make an API call that will automatically include the cookies.
 * 
 * @param checkAuthApiCall - Function that makes an API call to verify auth status
 * @returns Promise<boolean> - true if authenticated, false otherwise
 */
export const checkAuthStatus = async (
  checkAuthApiCall: () => Promise<any>
): Promise<boolean> => {
  try {
    const response = await checkAuthApiCall();
    // Adjust based on your API response structure
    // Common patterns: response.status === true, response.authenticated === true, etc.
    return response?.status === true || response?.authenticated === true || response?.data?.authenticated === true;
  } catch (error) {
    // If API call fails (401, 403, network error, etc.), user is not authenticated
    console.log("Auth check failed:", error);
    return false;
  }
};