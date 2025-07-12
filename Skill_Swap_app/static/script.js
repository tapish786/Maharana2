// Auto-load swap list
async function loadSwaps() {
  const res = await fetch('/swaps/');
  const data = await res.json();
  const list = document.getElementById('swapList');
  list.innerHTML = '';
  data.forEach(swap => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>Swap #${swap.id}</strong><br>
      From ${swap.sender_id} to ${swap.receiver_id}<br>
      Skill: ${swap.skill_offered} → ${swap.skill_requested}<br>
      Status: <b>${swap.status}</b><br>
      <button onclick="updateStatus(${swap.id}, 'accepted')">Accept</button>
      <button onclick="updateStatus(${swap.id}, 'rejected')">Reject</button>
      <button onclick="deleteSwap(${swap.id})">Delete</button>
      <hr>
    `;
    list.appendChild(item);
  });
}

// Update status
async function updateStatus(id, status) {
  const res = await fetch(`/swaps/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  alert(data.message || data.error);
  loadSwaps();
}

// Delete swap
async function deleteSwap(id) {
  if (confirm('Are you sure to delete this swap?')) {
    const res = await fetch(`/swaps/${id}`, { method: 'DELETE' });
    const data = await res.json();
    alert(data.message || data.error);
    loadSwaps();
  }
}
