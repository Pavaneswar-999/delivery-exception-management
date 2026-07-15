const exceptionForm = document.querySelector("#exception-form");
const deliveryIdInput = document.querySelector("#delivery-id");
const customerNameInput = document.querySelector("#customer-name");
const issueTypeInput = document.querySelector("#issue-type");
const notesInput = document.querySelector("#notes");
const formError = document.querySelector("#form-error");
const exceptionsBody = document.querySelector("#exceptions-body");
const emptyStateRow = document.querySelector("#empty-state-row");
const typeFilter = document.querySelector("#type-filter");
const statusFilter = document.querySelector("#status-filter");
const clearFiltersButton = document.querySelector("#clear-filters");
const totalCount = document.querySelector("#total-count");
const openCount = document.querySelector("#open-count");
const resolvedCount = document.querySelector("#resolved-count");
const deleteDialog = document.querySelector("#delete-dialog");
const deleteDialogCopy = document.querySelector("#delete-dialog-copy");
const closeDeleteDialogButton = document.querySelector("#close-delete-dialog");
const cancelDeleteButton = document.querySelector("#cancel-delete");
const confirmDeleteButton = document.querySelector("#confirm-delete");

const exceptions = [];
let nextExceptionId = 1;
let pendingDeleteException = null;

exceptionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const deliveryId = deliveryIdInput.value.trim();
  const customerName = customerNameInput.value.trim();
  const issueType = issueTypeInput.value;
  const notes = notesInput.value.trim();
  const selectedPriority = document.querySelector('input[name="priority"]:checked');

  clearValidationState();

  if (!deliveryId || !customerName || !issueType || !selectedPriority) {
    showValidationMessage("Complete all required fields before creating the record.");
    if (!deliveryId) {
      deliveryIdInput.classList.add("input-error");
    }
    if (!customerName) {
      customerNameInput.classList.add("input-error");
    }
    if (!issueType) {
      issueTypeInput.classList.add("input-error");
    }
    return;
  }

  const exception = {
    id: nextExceptionId,
    deliveryId: deliveryId,
    customerName: customerName,
    issueType: issueType,
    priority: selectedPriority.value,
    notes: notes,
    status: "Open",
    row: null
  };

  nextExceptionId += 1;
  exceptions.push(exception);
  exception.row = createExceptionRow(exception);
  exceptionsBody.appendChild(exception.row);
  emptyStateRow.classList.add("is-hidden");
  exceptionForm.reset();
  clearValidationState();
  showValidationMessage("Exception record created and added to the queue.", false);
  updateCounters();
  applyFilters();
  deliveryIdInput.focus();
});

exceptionsBody.addEventListener("click", function (event) {
  const actionButton = event.target;
  const action = actionButton.getAttribute("data-action");

  if (!action) {
    return;
  }

  if (action === "clear-filters") {
    resetFilters();
    return;
  }

  const exceptionId = Number(actionButton.getAttribute("data-id"));

  if (!exceptionId) {
    return;
  }

  const exception = findException(exceptionId);

  if (!exception) {
    return;
  }

  if (action === "resolve") {
    resolveException(exception);
  }

  if (action === "delete") {
    openDeleteDialog(exception);
  }
});

typeFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
clearFiltersButton.addEventListener("click", resetFilters);
closeDeleteDialogButton.addEventListener("click", closeDeleteDialog);
cancelDeleteButton.addEventListener("click", closeDeleteDialog);
confirmDeleteButton.addEventListener("click", confirmDelete);
deleteDialog.addEventListener("click", function (event) {
  if (event.target === deleteDialog) {
    closeDeleteDialog();
  }
});
deleteDialog.addEventListener("cancel", closeDeleteDialog);

function createExceptionRow(exception) {
  const row = document.createElement("tr");
  row.setAttribute("data-exception-id", exception.id);

  const deliveryIdCell = document.createElement("td");
  deliveryIdCell.classList.add("delivery-id");
  deliveryIdCell.textContent = exception.deliveryId;

  const customerCell = document.createElement("td");
  customerCell.classList.add("customer-cell");
  customerCell.textContent = exception.customerName;

  const issueCell = document.createElement("td");
  issueCell.classList.add("issue-cell");
  issueCell.setAttribute("title", exception.notes || exception.issueType);
  issueCell.textContent = exception.issueType;

  const priorityCell = document.createElement("td");
  const priorityBadge = document.createElement("span");
  priorityBadge.classList.add("priority-badge");
  priorityBadge.classList.add(getPriorityClass(exception.priority));
  priorityBadge.textContent = exception.priority;
  priorityCell.appendChild(priorityBadge);

  const statusCell = document.createElement("td");
  const statusBadge = document.createElement("span");
  statusBadge.classList.add("status-badge", "status-badge--open");
  statusBadge.textContent = exception.status;
  statusCell.appendChild(statusBadge);

  const actionsCell = document.createElement("td");
  actionsCell.classList.add("actions");

  const resolveButton = document.createElement("button");
  resolveButton.classList.add("action-button", "action-button--resolve");
  resolveButton.setAttribute("type", "button");
  resolveButton.setAttribute("data-action", "resolve");
  resolveButton.setAttribute("data-id", exception.id);
  resolveButton.textContent = "Resolve";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("action-button", "action-button--delete");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("data-action", "delete");
  deleteButton.setAttribute("data-id", exception.id);
  deleteButton.textContent = "Delete";

  actionsCell.appendChild(resolveButton);
  actionsCell.appendChild(deleteButton);
  row.appendChild(deliveryIdCell);
  row.appendChild(customerCell);
  row.appendChild(issueCell);
  row.appendChild(priorityCell);
  row.appendChild(statusCell);
  row.appendChild(actionsCell);

  exception.statusBadge = statusBadge;
  exception.resolveButton = resolveButton;

  return row;
}

function findException(exceptionId) {
  let matchedException = null;

  for (let index = 0; index < exceptions.length; index += 1) {
    if (exceptions[index].id === exceptionId) {
      matchedException = exceptions[index];
      break;
    }
  }

  return matchedException;
}

function resolveException(exception) {
  if (exception.status === "Resolved") {
    return;
  }

  exception.status = "Resolved";
  exception.statusBadge.classList.remove("status-badge--open");
  exception.statusBadge.classList.add("status-badge--resolved");
  exception.statusBadge.textContent = "Resolved";
  exception.resolveButton.disabled = true;
  exception.resolveButton.textContent = "Resolved";
  exception.row.classList.add("resolved-row");
  updateCounters();
  applyFilters();
}

function openDeleteDialog(exception) {
  pendingDeleteException = exception;
  deleteDialogCopy.textContent = "Delete record " + exception.deliveryId + "? This action cannot be undone.";

  if (typeof deleteDialog.showModal === "function") {
    deleteDialog.showModal();
    return;
  }

  if (window.confirm("Delete record " + exception.deliveryId + "? This action cannot be undone.")) {
    removeException(exception);
  }
}

function closeDeleteDialog() {
  pendingDeleteException = null;

  if (deleteDialog.open) {
    deleteDialog.close();
  }
}

function confirmDelete() {
  if (!pendingDeleteException) {
    return;
  }

  const exception = pendingDeleteException;
  closeDeleteDialog();
  removeException(exception);
}

function removeException(exception) {

  exceptionsBody.removeChild(exception.row);

  for (let index = 0; index < exceptions.length; index += 1) {
    if (exceptions[index].id === exception.id) {
      exceptions.splice(index, 1);
      break;
    }
  }

  if (exceptions.length === 0) {
    emptyStateRow.classList.remove("is-hidden");
  }

  updateCounters();
  applyFilters();
}

function applyFilters() {
  const selectedType = typeFilter.value;
  const selectedStatus = statusFilter.value;
  let visibleCount = 0;

  for (let index = 0; index < exceptions.length; index += 1) {
    const exception = exceptions[index];
    const matchesType = selectedType === "All" || exception.issueType === selectedType;
    const matchesStatus = selectedStatus === "All" || exception.status === selectedStatus;

    if (matchesType && matchesStatus) {
      exception.row.classList.remove("is-hidden");
      visibleCount += 1;
    } else {
      exception.row.classList.add("is-hidden");
    }
  }

  updateNoResultsState(visibleCount);
}

function resetFilters() {
  typeFilter.value = "All";
  statusFilter.value = "All";
  applyFilters();
}

function updateNoResultsState(visibleCount) {
  const noResultsRow = document.querySelector("#no-results-row");

  if (exceptions.length > 0 && visibleCount === 0) {
    if (!noResultsRow) {
      const row = document.createElement("tr");
      row.setAttribute("id", "no-results-row");
      row.classList.add("no-results-row");

      const cell = document.createElement("td");
      cell.setAttribute("colspan", "6");

      const message = document.createElement("div");
      message.classList.add("empty-state");
      const icon = document.createElement("span");
      icon.classList.add("empty-state__icon");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "⌕";
      const title = document.createElement("strong");
      title.textContent = "No exceptions match these filters";
      const description = document.createElement("span");
      description.textContent = "Clear the filters to view the full queue.";
      const clearButton = document.createElement("button");
      clearButton.classList.add("action-button", "action-button--clear");
      clearButton.setAttribute("type", "button");
      clearButton.setAttribute("data-action", "clear-filters");
      clearButton.textContent = "Clear filters";

      message.appendChild(icon);
      message.appendChild(title);
      message.appendChild(description);
      message.appendChild(clearButton);
      cell.appendChild(message);
      row.appendChild(cell);
      exceptionsBody.appendChild(row);
    }
    return;
  }

  if (noResultsRow) {
    exceptionsBody.removeChild(noResultsRow);
  }
}

function updateCounters() {
  let resolvedTotal = 0;

  for (let index = 0; index < exceptions.length; index += 1) {
    if (exceptions[index].status === "Resolved") {
      resolvedTotal += 1;
    }
  }

  totalCount.textContent = exceptions.length;
  resolvedCount.textContent = resolvedTotal;
  openCount.textContent = exceptions.length - resolvedTotal;
}

function getPriorityClass(priority) {
  if (priority === "High") {
    return "priority-badge--high";
  }

  if (priority === "Medium") {
    return "priority-badge--medium";
  }

  return "priority-badge--low";
}

function clearValidationState() {
  formError.classList.remove("is-visible");
  formError.textContent = "";
  deliveryIdInput.classList.remove("input-error");
  customerNameInput.classList.remove("input-error");
  issueTypeInput.classList.remove("input-error");
}

function showValidationMessage(message, isError = true) {
  formError.textContent = message;
  formError.classList.add("is-visible");

  if (!isError) {
    formError.classList.remove("form-alert");
    formError.classList.add("form-alert", "form-alert--success");
  } else {
    formError.classList.remove("form-alert--success");
  }
}

updateCounters();
