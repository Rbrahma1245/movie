export function debounce(func, delay) {
    let timeout;

    return function () {
      const context = this;
      // console.log(context, "from context");
      const args = arguments;
      // console.log(args, "from arguments");
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }