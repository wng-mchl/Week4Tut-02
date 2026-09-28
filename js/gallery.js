(function () {
  // The questions from about.txt, keyed by question number.
  const questions = {
    1: "What type of TV screen technologies are currently available in Australia and which are the most frequent?",
    2: "What screen sizes are available and which are most frequent?",
    3: "Which brands have the largest number of models?",
    4: "Which type of screen technology consumes the least amount of power?",
    5: "What is the relationship between screen size and power use?",
    6: "What is the relationship between star rating and screen size?",
    7: "Are there differences in power consumption between brands?",
  };

  // Data for every chart: what image to show, which question it answers (the
  // number + question text become the heading), its title (used as alt text),
  // its caption, and your analysis (shown in a section below the chart).
  // Write your analysis between the quotes; leave it "" to show a placeholder.
  const charts = [
    {
      src: "images/Q1_BarChart.png", q: 1,
      title: "Screen Technologies Currently Available in Australia",
      caption: "Bar Chart for Question 1",
      analysis: "LCD(LED) screens are by far the most abundant models available.",
    },
    {
      src: "images/Q1_PieChart.png", q: 1,
      title: "Percentages of Screen Technologies Currently Available in Australia",
      caption: "Pie Chart for Question 1",
      analysis: "Majority of screen technologies currently available are LCD(LED) Screens.",
    },
    {
      src: "images/Q2_BarChart_Desc.png", q: 2,
      title: "Frequency of Screen Sizes",
      caption: "Bar Chart for Question 2",
      analysis: "65 and 55 inch screens are the most common screensize types available, followed by 75 inch screens.",
    },
    {
      src: "images/Q3_BarChart_Desc.png", q: 3,
      title: "Number of Models Per Brand",
      caption: "Bar Chart for Question 3",
      analysis: "Kogan, LG and Samsung Electronics dominate the market.",
    },
    {
      src: "images/Q4_BarChart_Desc.png", q: 4,
      title: "Average Power Consumption per Screen Technology",
      caption: "Bar Chart for Question 4",
      analysis: "LCD screens consume the least power, represented by median data. LCD(LED) and OLED screens share practically the same average power consumption.",
    },
    {
      src: "images/Q5_ScatterPlot.png", q: 5,
      title: "Screen Size against Average Power Consumption",
      caption: "Scatter Plot for Question 5",
      analysis: "According to the chart, the bigger the screen size, the higher the average mode of power. However, there are still screensizes which are on the bigger end consuming less power too.",
    },
    {
      src: "images/Q6_ScatterPlot.png", q: 6,
      title: "Screen Size against Star Rating",
      caption: "Scatter Plot for Question 6",
      analysis: "There seems to be no apparent trend here, smaller screen sizes have generally the same range of efficiency, but some sizes from 40 to 80 inches can be quite power efficient too.",
    },
    {
      src: "images/Q7_BarChart.png", q: 7,
      title: "Average Power Consumption per Brand",
      caption: "Bar Chart for Question 7",
      analysis: "Spark Electronics have the highest average power consumption. Going bck to our more popular models, it seems that Samsung Electronics and LG also put out quite power-demanding televisions, although the difference is not large.",
    },
    {
      src: "images/Q7_BoxPlot.png", q: 7,
      title: "Average Power Consumption per Brand",
      caption: "Box Plot for Question 7",
      analysis: "Most brands make televisions that have around the same range of power consumption, with some brands like Wintal and Sharp with exceptionally high consumption.",
    },
  ];

  // Builds the heading: a "Q1" badge beside the question text.
  function buildQuestionTitle(chart) {
    const title = document.createElement("h3");
    title.className = "chart-question";

    const num = document.createElement("span");
    num.className = "q-num";
    num.textContent = `Q${chart.q}`;

    const text = document.createElement("span");
    text.textContent = questions[chart.q];

    title.appendChild(num);
    title.appendChild(text);
    return title;
  }

  // Builds the analysis section that sits below each chart.
  function buildAnalysis(chart) {
    const section = document.createElement("section");
    section.className = "analysis";

    const heading = document.createElement("h4");
    heading.textContent = "Analysis";

    const body = document.createElement("p");
    if (chart.analysis) {
      body.textContent = chart.analysis;
    } else {
      body.textContent = "Analysis coming soon.";
      body.className = "muted";
    }

    section.appendChild(heading);
    section.appendChild(body);
    return section;
  }

  // The ONE container both views get built into. Whichever view is active,
  // the other view's elements don't exist in the DOM at all.
  const container = document.getElementById("view-container");
  const gridBtn = document.getElementById("grid-view-btn");
  const carouselBtn = document.getElementById("carousel-view-btn");

  // Which chart the carousel is currently showing.
  let currentIndex = 0;

  // Clears the container and fills it with the grid: one <figure>
  // (title + image + caption) per chart, all shown at once.
  function buildGridView() {
    container.innerHTML = ""; // wipe out whatever view was there before

    const grid = document.createElement("div");
    grid.className = "chart-grid";

    charts.forEach((chart) => {
      const figure = document.createElement("figure");
      figure.className = "chart-card";

      const title = buildQuestionTitle(chart);

      const img = document.createElement("img");
      img.src = chart.src;
      img.alt = chart.title;

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = chart.caption;

      figure.appendChild(title);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.appendChild(buildAnalysis(chart));
      grid.appendChild(figure);
    });

    container.appendChild(grid);
  }

  // Clears the container and fills it with the carousel: just the single
  // chart at charts[currentIndex], plus prev/next buttons.
  function buildCarouselView() {
    container.innerHTML = ""; // wipe out whatever view was there before

    const chart = charts[currentIndex];

    const carousel = document.createElement("div");
    carousel.className = "carousel";

    const title = buildQuestionTitle(chart);

    const main = document.createElement("div");
    main.className = "carousel-main";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "←"; // left arrow
    prevBtn.setAttribute("aria-label", "Previous chart");
    prevBtn.addEventListener("click", () => {
      // % wraps the index back into range: "previous" from 0 loops to the last chart.
      currentIndex = (currentIndex - 1 + charts.length) % charts.length;
      buildCarouselView(); // rebuild the whole view at the new index
    });

    const img = document.createElement("img");
    img.src = chart.src;
    img.alt = chart.title;

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "→"; // right arrow
    nextBtn.setAttribute("aria-label", "Next chart");
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % charts.length;
      buildCarouselView();
    });

    main.appendChild(prevBtn);
    main.appendChild(img);
    main.appendChild(nextBtn);

    const caption = document.createElement("p");
    caption.textContent = chart.caption;

    const counter = document.createElement("p");
    counter.className = "muted";
    counter.textContent = `${currentIndex + 1} / ${charts.length}`;

    carousel.appendChild(title);
    carousel.appendChild(main);
    carousel.appendChild(caption);
    carousel.appendChild(counter);
    carousel.appendChild(buildAnalysis(chart));

    container.appendChild(carousel);
  }

  function showGridView() {
    gridBtn.classList.add("active");
    carouselBtn.classList.remove("active");
    buildGridView();
  }

  function showCarouselView() {
    carouselBtn.classList.add("active");
    gridBtn.classList.remove("active");
    buildCarouselView();
  }

  gridBtn.addEventListener("click", showGridView);
  carouselBtn.addEventListener("click", showCarouselView);

  // Grid is the default view on page load.
  buildGridView();
})();
