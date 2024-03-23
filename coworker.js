document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();

  // Retrieve logged-in user's information from local storage
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Display the logged-in user's name
  if (loggedInUser) {
    var loggedInUserElement = document.getElementById("loggedInUser");
    loggedInUserElement.textContent = "Logged in as: " + loggedInUser.username;
  }

  var sampleData = [
    {
      propertyId: 1,
      address: "123 Main St. SE, Calgary, Canada",
      neighborhood: "Downtown",
      squareFeet: 2000,
      parking: "Yes",
      publicTransportation: "Yes",
    },
    {
      propertyId: 2,
      address: "456 Elm St, Banff, Alberta, Canada",
      neighborhood: "Suburban",
      squareFeet: 1800,
      parking: "Yes",
      publicTransportation: "No",
    },
    {
      propertyId: 3,
      address: "53 Pongco St. Brgy. Mariblo, Quezon City, Philippines",
      neighborhood: "Residential",
      squareFeet: 500,
      parking: "No",
      publicTransportation: "Yes",
    },
    {
      propertyId: 4,
      address: "155 De Vera St. SFDM, Quezon City, Philippines",
      neighborhood: "Downtown",
      squareFeet: 600,
      parking: "Yes",
      publicTransportation: "Yes",
    },
    {
      propertyId: 5,
      address: "Calle 32a Sur Transversal, Colombia",
      neighborhood: "Residential",
      squareFeet: 800,
      parking: "Yes",
      publicTransportation: "No",
    },
  ];

  var workspaceData = [
    {
      propertyId: 1,
      workspaceId: 1,
      type: "Meeting Rooms",
      seatNumber: 10,
      allowSmoking: "No",
      dateAvailable: "15-03-2024",
      leaseTerm: "Day",
      price: "100",
      contactInfo: "contact1@example.com",
    },
    {
      propertyId: 1,
      workspaceId: 2,
      type: "Meeting Rooms",
      seatNumber: 20,
      allowSmoking: "No",
      dateAvailable: "17-03-2024",
      leaseTerm: "Week",
      price: "200",
      contactInfo: "contact1@example.com",
    },
    {
      propertyId: 2,
      workspaceId: 2,
      type: "Private Office Rooms",
      seatNumber: 15,
      allowSmoking: "Yes",
      dateAvailable: "16-03-2024",
      leaseTerm: "Month",
      price: "1200",
      contactInfo: "contact2@example.com",
    },
    // Add similar entries for property IDs 2 through 5
  ];

  var tableBody = document.getElementById("propertyTableBody");

  var searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    showNoWorkspaceDataMessage();

    var addressInput = document.getElementById("address").value.toLowerCase();
    var neighborhoodInput = document
      .getElementById("neighborhood")
      .value.toLowerCase();
    var squareFeetInput = parseInt(
      document.getElementById("squarefeet").value,
      10
    );
    var parkingInput = document.getElementById("parking").value;
    var publicTranspoInput = document.getElementById("public-transpo").value;
    var seatNumberInput = parseInt(
      document.getElementById("seatnumber").value,
      10
    );
    var leaseTermInput = document.getElementById("lease-term").value;
    var allowSmokingInput = document.getElementById("allow-smoking").value;
    var priceInput = parseInt(document.getElementById("price").value, 10);

    var dateAvailableInput = document.getElementById("dateavailable").value;
    var dateAvailableInputFormatted = ""; // Initialize a formatted date string

    // Check if dateAvailableInput is not empty and format it
    if (dateAvailableInput) {
      // Assuming the input is in YYYY-MM-DD and needs to be converted to DD-MM-YYYY
      var parts = dateAvailableInput.split("-");
      dateAvailableInputFormatted = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to DD-MM-YYYY format
    }

    // Enhanced check for all inputs are empty or not
    if (
      !addressInput &&
      !neighborhoodInput &&
      isNaN(squareFeetInput) &&
      !parkingInput &&
      !publicTranspoInput &&
      isNaN(seatNumberInput) &&
      !leaseTermInput &&
      !allowSmokingInput &&
      isNaN(priceInput) &&
      !dateAvailableInput
    ) {
      document.getElementById("searchMessage").style.display = "block";
      return; // Stop the function here to prevent search
    } else {
      document.getElementById("searchMessage").style.display = "none";
    }

    // Clear the table body first before repopulating
    tableBody.innerHTML = "";

    // Filter properties based on inputs and workspace data
    var filteredProperties = sampleData.filter(function (property) {
      var propertyMatches =
        (!addressInput ||
          property.address.toLowerCase().includes(addressInput)) &&
        (!neighborhoodInput ||
          property.neighborhood.toLowerCase().includes(neighborhoodInput)) &&
        (isNaN(squareFeetInput) || property.squareFeet >= squareFeetInput) &&
        (!parkingInput || property.parking === parkingInput) &&
        (!publicTranspoInput ||
          property.publicTransportation === publicTranspoInput);

      var workspaceCriteriaProvided =
        !isNaN(seatNumberInput) ||
        leaseTermInput ||
        allowSmokingInput ||
        priceInput ||
        dateAvailableInputFormatted;

      if (!workspaceCriteriaProvided) {
        return propertyMatches; // No workspace criteria provided, so return property matches only
      }

      var workspaceMatches = workspaceData.some(function (workspace) {
        var leaseTermMatches =
          !leaseTermInput ||
          workspace.leaseTerm.toLowerCase() === leaseTermInput.toLowerCase();
        var allowSmokingMatches =
          !allowSmokingInput || workspace.allowSmoking === allowSmokingInput;
        var seatCapacityMatches =
          isNaN(seatNumberInput) || workspace.seatNumber >= seatNumberInput;
        var priceMatches =
          isNaN(priceInput) || parseInt(workspace.price) >= priceInput;
        var dateMatches =
          !dateAvailableInputFormatted ||
          workspace.dateAvailable === dateAvailableInputFormatted;
        return (
          workspace.propertyId === property.propertyId &&
          leaseTermMatches &&
          allowSmokingMatches &&
          seatCapacityMatches &&
          priceMatches &&
          dateMatches
        );
      });

      return propertyMatches && workspaceMatches;
    });

    // Populate the table or show "No data available"
    if (filteredProperties.length > 0) {
      filteredProperties.forEach(function (property) {
        var row = document.createElement("tr");
        row.innerHTML = `<td>${property.propertyId}</td><td>${property.address}</td><td>${property.neighborhood}</td><td>${property.squareFeet}</td><td>${property.parking}</td><td>${property.publicTransportation}</td><td><button class="view-details-btn" data-id="${property.propertyId}">View Details</button></td>`;
        tableBody.appendChild(row);
      });
    } else {
      var noDataRow = document.createElement("tr");
      var noDataCell = document.createElement("td");
      noDataCell.colSpan = 7;
      noDataCell.textContent = "No property data available";
      noDataCell.style.textAlign = "center";
      noDataRow.appendChild(noDataCell);
      tableBody.appendChild(noDataRow);

      showNoWorkspaceDataMessage(); // Clear and show no data message for workspace data
    }
  });

  // Add event listener for the Clear Filters button
  var clearFiltersBtn = document.getElementById("clearFiltersBtn");

  clearFiltersBtn.addEventListener("click", function () {
    // Clear form fields
    document.getElementById("address").value = "";
    document.getElementById("neighborhood").value = "";
    document.getElementById("squarefeet").value = "";
    document.getElementById("parking").selectedIndex = 0;
    document.getElementById("public-transpo").selectedIndex = 0;
    document.getElementById("seatnumber").value = "";
    document.getElementById("allow-smoking").selectedIndex = 0;
    document.getElementById("dateavailable").value = "";
    document.getElementById("lease-term").selectedIndex = 0;
    document.getElementById("price").value = "";

    // Repopulate table with all data from sampleData
    tableBody.innerHTML = ""; // Clear current table body first

    showNoPropertyDataMessage();
    showNoWorkspaceDataMessage();

    document.getElementById("noDataMessage").style.display = "none"; // Hide No Data Message if shown
  });

  // VIEW DETAILS BUTTON
  document
    .getElementById("propertyTableBody")
    .addEventListener("click", function (event) {
      var target = event.target;
      if (target.classList.contains("view-details-btn")) {
        var propertyId = target.getAttribute("data-id");
        populateWorkspaceData(propertyId);
      }
    });

  function populateWorkspaceData(propertyId) {
    var workspaceTableBody = document.getElementById("workspaceTableBody"); // Assume this is your workspace table body ID
    workspaceTableBody.innerHTML = ""; // Clear previous data

    var selectedLeaseTerm = document.getElementById("lease-term").value;
    var allowSmokingFilter = document.getElementById("allow-smoking").value;
    var dateAvailableInput = document.getElementById("dateavailable").value;
    var priceInput = document.getElementById("price").value;
    var seatCapacityInput = document.getElementById("seatnumber").value;

    var dateAvailableInputFormatted = "";

    // Format the dateAvailableInput if not empty
    if (dateAvailableInput) {
      var parts = dateAvailableInput.split("-");
      dateAvailableInputFormatted = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to DD-MM-YYYY format
    }
    // var filteredWorkspaces = workspaceData.filter(function (workspace) {
    //   return workspace.propertyId == propertyId;
    // });

    // Filter workspaces based on the selected property ID and lease term
    var filteredWorkspaces = workspaceData.filter(function (workspace) {
      // Check if workspace matches the property ID
      var propertyMatch = workspace.propertyId == propertyId;
      var leaseTermMatches =
        selectedLeaseTerm === "" ||
        workspace.leaseTerm.toLowerCase() === selectedLeaseTerm.toLowerCase();

      var allowSmokingMatch =
        !allowSmokingFilter || workspace.allowSmoking === allowSmokingFilter;

      var dateAvailableMatch =
        !dateAvailableInputFormatted ||
        workspace.dateAvailable === dateAvailableInputFormatted;

      var priceMatches = true;
      if (priceInput) {
        var workspacePrice = parseInt(workspace.price, 10);
        var inputPrice = parseInt(priceInput, 10);
        priceMatches = workspacePrice >= inputPrice;
      }

      var seatCapacityMatches = true;
      if (seatCapacityInput) {
        var workspaceSeatNumber = parseInt(workspace.seatNumber, 10);
        var inputSeatCapacity = parseInt(seatCapacityInput, 10);
        seatCapacityMatches = workspaceSeatNumber >= inputSeatCapacity; // Change this line
      }

      return (
        propertyMatch &&
        leaseTermMatches &&
        allowSmokingMatch &&
        dateAvailableMatch &&
        priceMatches &&
        seatCapacityMatches
      );
    });

    if (filteredWorkspaces.length > 0) {
      filteredWorkspaces.forEach(function (workspace) {
        var row = document.createElement("tr");
        row.innerHTML = `<td>${workspace.propertyId}</td><td>${workspace.workspaceId}</td><td>${workspace.type}</td><td>${workspace.seatNumber}</td><td>${workspace.allowSmoking}</td><td>${workspace.dateAvailable}</td><td>${workspace.leaseTerm}</td><td>${workspace.price}</td><td>${workspace.contactInfo}</td>`;
        workspaceTableBody.appendChild(row);
      });
    } else {
      var noDataRow = document.createElement("tr");
      var noDataCell = document.createElement("td");
      noDataCell.colSpan = 9;
      noDataCell.textContent = "No workspace data available";
      noDataCell.style.textAlign = "center";
      noDataRow.appendChild(noDataCell);
      workspaceTableBody.appendChild(noDataRow);
    }
  }

  // Display 'No property data available' message initially
  showNoPropertyDataMessage();

  function showNoPropertyDataMessage() {
    var tableBody = document.getElementById("propertyTableBody");
    tableBody.innerHTML = ""; // Ensure the table is clear first
    var noDataRow = document.createElement("tr");
    var noDataCell = document.createElement("td");
    noDataCell.colSpan = 7; // Assuming your table has 7 columns
    noDataCell.textContent = "No property data available";
    noDataCell.style.textAlign = "center";
    noDataRow.appendChild(noDataCell);
    tableBody.appendChild(noDataRow);
  }

  // DISPLAY NO WORKSPACE DATA AVAILABLE IN THE WORKSPACE TABLE WHEN PAGE LOAD
  showNoWorkspaceDataMessage();

  function showNoWorkspaceDataMessage() {
    var workspaceTableBody = document.getElementById("workspaceTableBody"); // Make sure this is the correct ID of your workspace table body
    workspaceTableBody.innerHTML = ""; // Clear existing content

    var noDataRow = document.createElement("tr");
    var noDataCell = document.createElement("td");
    noDataCell.colSpan = 9; // Adjust according to your workspace table's column count
    noDataCell.textContent = "No workspace data available";
    noDataCell.style.textAlign = "center";
    noDataRow.appendChild(noDataCell);
    workspaceTableBody.appendChild(noDataRow);
  }
});
