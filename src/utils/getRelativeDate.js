 const getRelativeTime = date => {

  {/* convert time(hh:mm:ss) to a single whole number*/}
  var productsTimeInNumber = parseInt(date.slice(16, 24).split(":").join(""));
  var currentTimeInNumber = parseInt(new Date().toString().slice(16, 24).split(":").join(""));

  {/* get the absolute difference*/}
  var timeDifference = Math.abs(productsTimeInNumber - currentTimeInNumber);

  {/* convert hours, day and week to minutes */}
  var minute = 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;

  var relativeTime;

  if (timeDifference < minute) {
      relativeTime = timeDifference + ' seconds ago';
  } else if (timeDifference < 2 * minute) {
      relativeTime = 'about a minute ago'
  } else if (timeDifference < hour) {
      relativeTime = Math.floor(timeDifference / minute) + ' minutes ago';
  } else if (Math.floor(timeDifference / hour) == 1) {
      relativeTime = '1 hour ago'
  } else if (timeDifference < day) {
      relativeTime = Math.floor(timeDifference / hour) + ' hours ago';
  } else if (timeDifference < day * 2) {
      relativeTime = 'yesterday';
  }

  return relativeTime;

}

export const generateRelativeDate = (date) => {

  {/* get relevant week, month, date and year, string from a long full date string and split into an array */}
  var productsDateArray = date.slice(0, 15).split(" ");
  var currentDateArray = new Date().toString().slice(0, 15).split(" ");
  var dateDifference = Math.abs(currentDateArray[2] - productsDateArray[2]);


    {/* check if given product year and current year are the same */}
  if (productsDateArray[3] == currentDateArray[3]) {

    {/* check if given product month and current month are the same */}
    if (productsDateArray[1] == currentDateArray[1]) {

      {/* check if the difference in product day and current day is less than 2 days */}
      if (dateDifference < 2) {
        return getRelativeTime(date);
      }
      {/* check if the difference in product day and current day is less than 8 days */}
      if (dateDifference < 8 ) {
        return (dateDifference + "days ago")
      }

    }
  }

  return date.slice(0, 15);
};
