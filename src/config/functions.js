export function calculatePercentage(value, totalVal) {
  return (value / totalVal) * 100;
}

export function calculateFoodExpense(data) {
  let sum = 0;
  const total = data
    ?.filter((item) => item?.category === "Food")
    ?.forEach((item) => (sum = sum + parseInt(item?.price)));
  return sum;
}

export function calculateTravelExpense(data) {
  let sum = 0;
  let total = data
    ?.filter((item) => item?.category === "Travel")
    ?.forEach((item) => (sum = sum + parseInt(item?.price)));
  return sum;
}

export function calculateEntertainmentExpense(data) {
  let sum = 0;
  let total = data
    ?.filter((item) => item?.category === "Entertainment")
    ?.forEach((item) => (sum = sum + parseInt(item?.price)));
  return sum;
}
