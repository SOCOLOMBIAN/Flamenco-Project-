
// --- Navigation ---
function goTo(page) {
  window.location.href = page;
}

// --- Toggle password visibility ---
function togglePassword(inputId, btnId) {
  var input = document.getElementById(inputId);
  var btn = document.getElementById(btnId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Hide';
  } else {
    input.type = 'password';
    btn.textContent = 'Show';
  }
}

// --- Show message ---
function showMsg(elementId, text, type) {
  var el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.className = 'alert alert-' + type;
  el.classList.remove('hidden');
}

// --- Sidebar active item ---
function setActiveSidebar(el) {
  document.querySelectorAll('.sidebar-item').forEach(function(item) {
    item.classList.remove('active');
  });
  if (el) el.classList.add('active');
}

// --- Login validation ---
function validateLogin(emailId, passwordId, msgId) {
  var email = document.getElementById(emailId).value.trim();
  var password = document.getElementById(passwordId).value;
  if (!email || !password) {
    showMsg(msgId, 'Please fill in all fields.', 'error');
    return false;
  }
  if (!email.includes('@')) {
    showMsg(msgId, 'Please enter a valid email address.', 'error');
    return false;
  }
  return true;
}

// --- Signup validation ---
function validateSignup(emailId, pwId, pw2Id, roleId, msgId) {
  var email = document.getElementById(emailId).value.trim();
  var pw = document.getElementById(pwId).value;
  var pw2 = document.getElementById(pw2Id).value;
  var role = document.getElementById(roleId).value;
  if (!email || !pw || !role) {
    showMsg(msgId, 'Please fill in all required fields.', 'error');
    return false;
  }
  if (!email.includes('@')) {
    showMsg(msgId, 'Please enter a valid email address.', 'error');
    return false;
  }
  if (pw.length < 8) {
    showMsg(msgId, 'Password must be at least 8 characters.', 'error');
    return false;
  }
  if (pw !== pw2) {
    showMsg(msgId, 'Passwords do not match.', 'error');
    return false;
  }
  return true;
}

// --- Filter listings by search + type ---
function filterListings(searchValue, activeType) {
  var cards = document.querySelectorAll('.listing-card');
  var count = 0;
  cards.forEach(function(card) {
    var title = (card.dataset.title || '').toLowerCase();
    var type = (card.dataset.type || '').toLowerCase();
    var matchSearch = !searchValue || title.includes(searchValue.toLowerCase());
    var matchType = !activeType || activeType === 'all' || type === activeType.toLowerCase();
    if (matchSearch && matchType) {
      card.style.display = 'block';
      count++;
    } else {
      card.style.display = 'none';
    }
  });
  var countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = count + ' listing' + (count !== 1 ? 's' : '') + ' found';
}

// --- Photo upload preview ---
function handlePhotoUpload(inputId, previewId, statusId) {
  var input = document.getElementById(inputId);
  if (!input) return;
  var preview = document.getElementById(previewId);
  var status = document.getElementById(statusId);
  input.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        preview.style.backgroundImage = 'url(' + ev.target.result + ')';
        preview.style.backgroundSize = 'cover';
        preview.style.backgroundPosition = 'center';
        preview.style.border = '2px solid #5C0A1E';
        preview.innerHTML = '';
        if (status) { status.textContent = 'Photo added!'; status.style.color = '#3B6D11'; }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });
}

// --- Chat ---
function sendChatMessage(inputId, boxId, initials) {
  var input = document.getElementById(inputId);
  var box = document.getElementById(boxId);
  var msg = input.value.trim();
  if (!msg) return;
  var div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:8px;justify-content:flex-end;margin-bottom:10px';
  div.innerHTML =
    '<div><div style="font-size:10px;color:#7A3A45;margin-bottom:2px;text-align:right">You · now</div>' +
    '<div style="background:#5C0A1E;border-radius:8px 0 8px 8px;padding:8px 12px;font-size:13px;color:#FDF8F0;display:inline-block">' + msg + '</div></div>' +
    '<div style="width:28px;height:28px;border-radius:50%;background:#3D0A12;display:flex;align-items:center;justify-content:center;font-size:10px;color:#FDF8F0;flex-shrink:0">' + (initials || 'YN') + '</div>';
  box.appendChild(div);
  input.value = '';
  box.scrollTop = box.scrollHeight;
}