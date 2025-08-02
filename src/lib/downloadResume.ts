import { browser } from "$app/environment";

let cvUrl =
	'https://www.overleaf.com/download/project/6889e7ce0bf2200ba671f059/build/19863ee9961-57fa4d91d92f36da/output/output.pdf?compileGroup=standard&clsiserverid=clsi-reg-n2d-c-f-02df&enable_pdf_caching=true&popupDownload=true';
let isLoadingResume = false;
export function downloadResume() {
	if (cvUrl && browser) {
		isLoadingResume = true;
		setTimeout(() => {
			isLoadingResume = false;
			window.open(cvUrl, '_blank', 'noopener,noreferrer');
		}, 1500);
	}
}
