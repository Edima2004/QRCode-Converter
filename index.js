const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
	e.preventDefault();
	clearUI();
	const url = document.getElementById('url').value;
	const col1 = document.getElementById('col1').value;
	const col2 = document.getElementById('col2').value;
	const size = document.getElementById('size').value;
	if (!url) {
		alert('Please enter a URL');
	} else {
		console.log(url, size);
		showSpinner();

		setTimeout(() => {
			hideSpinner();

			generateQRCode(url, size, col1, col2);

			setTimeout(() => {
				const saveUrl = qr.querySelector('img').src;
				createSaveBtn(saveUrl, col1, col2);
			}, 50);
		}, 1000);
	}
};

const generateQRCode = (url, size, col1, col2) => {
	const qrcode = new QRCode('qrcode', {
		text: url,
		width: size,
		height: size,
		colorLight: col1 || '#000000',
		colorDark: col2 || '#ffffff',
	});
};

const showSpinner = () => {
	document.getElementById('spinner').style.display = 'flex';
};

const hideSpinner = () => {
	document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
	qr.innerHTML = '';
	const saveBtn = document.getElementById('save-link');
	if (saveBtn) saveBtn.remove();
};

const createSaveBtn = (saveUrl, col1, col2) => {
	const link = document.createElement('a');

	link.addEventListener('mouseenter', () => {
		link.style.backgroundColor = col2;
		link.style.color = col1;
	});

	link.addEventListener('mouseleave', () => {
		link.style.backgroundColor = col1;
		link.style.color = col2;
	});

	link.id = 'save-link';
	link.href = saveUrl;
	link.download = 'qrcode';
	link.innerHTML = 'Save Image';

	(link.style.backgroundColor = col1),
		(link.classList = 'input box img2'),
		(link.style.color = col2),
		(link.style.borderColor = col2),
		(link.style.textDecoration = 'none');
	document.getElementById('generated').appendChild(link);
};

form.addEventListener('submit', onGenerateSubmit);
