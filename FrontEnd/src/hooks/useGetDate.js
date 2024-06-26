export const useGetDate = () => {
  let today = new Date();
  // Lấy các thành phần của ngày
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  let day = String(today.getDate()).padStart(2, "0");

  // Định dạng ngày theo mẫu YYYY-MM-DD
  let formattedDate = `${year}-${month}-${day}`;

  // Tạo startDate và endDate
  let startDate = formattedDate;
  let endDate = formattedDate;

  // console.log("Start Date: " + startDate);
  // console.log("End Date: " + endDate);
  return { startDate, endDate };
};
export const useYesterdayDate = () => {
  // Lấy ngày giờ hiện tại
  let today = new Date();

  // Trừ một ngày để lấy ngày hôm qua
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Lấy các thành phần của ngày hôm qua
  let year = yesterday.getFullYear();
  let month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  let day = String(yesterday.getDate()).padStart(2, "0");

  // Định dạng ngày theo mẫu YYYY-MM-DD
  let formattedDate = `${year}-${month}-${day}`;

  // Tạo startDate và endDate
  let yesStartDate = formattedDate;
  let yesEndDate = formattedDate;

  // console.log("Start Date: " + yesStartDate);
  // console.log("End Date: " + yesEndDate);
  return { yesStartDate, yesEndDate };
};
export const useLast7Days = () => {
  // Lấy ngày hiện tại
  let today = new Date();

  // Tạo đối tượng Date mới cho startDate và trừ đi 7 ngày
  let start = new Date(today);
  start.setDate(today.getDate() - 7);

  // Lấy các thành phần của startDate
  let startYear = start.getFullYear();
  let startMonth = String(start.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  let startDay = String(start.getDate()).padStart(2, "0");

  // Lấy các thành phần của endDate
  let endYear = today.getFullYear();
  let endMonth = String(today.getMonth() + 1).padStart(2, "0");
  let endDay = String(today.getDate()).padStart(2, "0");

  // Định dạng ngày theo mẫu YYYY-MM-DD
  let startDate7 = `${startYear}-${startMonth}-${startDay}`;
  let endDate7 = `${endYear}-${endMonth}-${endDay}`;

  // console.log("Start Date: " + startDate7);
  // console.log("End Date: " + endDate7);

  return { startDate7, endDate7 };
};
