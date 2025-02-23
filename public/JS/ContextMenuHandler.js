import { editarContenido } from "./editContent/editContent.js";
import { ChangeFontSize } from "./fontSize.js";

class ContextMenuHandler {
	constructor() {
		this.handleSelectedElement = {
			P: ({ element }) => element.closest("div.texto-plano"),
			IMG: ({ element }) => element.closest("figure"),
			FIGCAPTION: ({ element }) => element.closest("figure"),
		};

		this.optionMenuContextual = {
			edit: null,
			deleteContent: null,
			fontSize: null,
			editQr: null,
			editQrText: null,
			resize: null,
		};

		this.selectedElement = null;

		this.contextMenu = document.getElementById("context-menu");
		this.changeFontSize = new ChangeFontSize();
		this.modalChangeText = document.querySelector("#myModalChangeText");
		this.formFontSize = document.getElementById("FormFontSize");

		this.initialize();
	}

	async initialize() {
		try {
			await this.validateContextMenu();
			await this.inizializateElementOptions();
			this.setupEventListeners();
		} catch (error) {
			console.error("Error al crear un Menu Contextual:", error.message);
		}
	}

	// Validaciones
	async validateContextMenu() {
		const contentMenuExist = await new Promise((resolve) => resolve(Boolean(this.contextMenu)));

		if (!contentMenuExist) {
			throw new Error("No se encontro el elemento #context-menu");
		}
	}

	async validateElementSelected() {
		const elementExist = await new Promise((resolve) => resolve(Boolean(this.selectedElement)));

		if (!elementExist) {
			throw new Error("No se encontro el elemento selecionado");
		}
	}

	async validateModalChangeText() {
		const modalExist = await new Promise((resolve) => resolve(Boolean(this.modalChangeText)));

		if (!modalExist) {
			throw new Error("No se encontro el elemento #myModalChangeText");
		}
	}

	async inizializateElementOptions() {
		const options = {
			edit: document.getElementById("edit-option"),
			deleteContent: document.getElementById("delete-option"),
			fontSize: document.getElementById("font-size-option"),
			editQr: document.getElementById("edit-qr-option"),
			editQrText: document.getElementById("edit-title-qr-option"),
			resize: document.getElementById("resize-option"),
		};

		const missingOptions = Object.entries(options)
			.filter(([key, value]) => !value)
			.map(([key]) => key);

		if (missingOptions.length > 0) {
			throw new Error(
				`No se encontraron los elementos necesarios para inicializar el menú contextual: [${missingOptions.join(", ")}]`
			);
		}

		// Asignar los elementos validados a `optionModal`
		this.optionMenuContextual = options;
	}

	setClickEventListener({ element, handleFunction }) {
		element.addEventListener("click", () => handleFunction());
	}

	async setupEventListeners() {
		try {
			const { edit, editQr, editQrText, fontSize, deleteContent, resize } = this.optionMenuContextual;

			// Mapeo de elementos y funciones
			const clickEventMap = [
				{ element: edit, handleFunction: this.handleEditContent.bind(this) },
				{ element: editQr, handleFunction: this.handleEditContent.bind(this) },
				{ element: deleteContent, handleFunction: this.handleDeleteContent.bind(this) },
				{ element: fontSize, handleFunction: this.handleChangeFontSize.bind(this) },
				{ element: editQrText, handleFunction: this.handleEditTextQr.bind(this) },
				{ element: resize, handleFunction: this.handleResizeElement.bind(this) },
			];

			// Asignar los eventos utilizando el mapeo
			clickEventMap.forEach(({ element, handleFunction }) => {
				this.setClickEventListener({ element, handleFunction });
			});

			// Otros listeners específicos
			areaDeImpresion.addEventListener("contextmenu", (e) => this.handleOpenMenu(e));
			document.addEventListener("click", () => this.hideContextMenu());
		} catch (error) {
			console.error("Error: ha ocurrido un error al inicializar los eventos del menuContextual:", error);
		}
	}

	async handleEditContent() {
		try {
			await this.validateElementSelected();

			editarContenido({ element: this.selectedElement });
			this.selectedElement = null;
		} catch (error) {
			console.error("Errror: ha ocurrido un error al editar el contenido desde el menuContextual", error);
		}
	}

	async handleDeleteContent() {
		try {
			await this.validateElementSelected();
			this.selectedElement.remove();
			this.selectedElement = null;
		} catch (error) {
			console.error("Error: ha ocurrido un error al eliminar el contenido desde el menuContextual", error);
		}
	}

	async handleChangeFontSize() {
		try {
			await this.validateElementSelected();
			await this.validateModalChangeText();

			if (this.changeFontSize) {
				this.modalChangeText.style.display = "block";
				this.changeFontSize.setElementSelected(this.selectedElement);
				this.formFontSize.classList.remove("d-none");
			}
		} catch (error) {
			console.error("Error: ha ocurrido un error cambiar el tamaño de fuente desde el menuContextual", error);
		}
	}

	async handleEditTextQr() {
		try {
			await this.validateElementSelected();
			await this.validateModalChangeText();

			console.log("se se seleciono editar texto:", this.selectedElement);
		} catch (error) {
			console.error(
				"Error: ha ocurrido un error al cambiar el contenido de texto de un QR desde el menuContextual",
				error
			);
		}
	}

	async handleResizeElement() {
		try {
			await this.validateElementSelected();

			console.log("se se seleciono Cambiar tamaño :", this.selectedElement);
		} catch (error) {
			console.error("Error: ha ocurrido un error al cambiar de tamaño desde el menuContextual", error);
		}
	}

	hideContextMenu() {
		if (this.contextMenu) {
			this.contextMenu.style.display = "none";
		}
	}

	showContentMenu({ pageX, pageY }) {
		if (!this.contextMenu) {
			// ToastAlert.showAlertFullTop('No se encontró el menú', 'error');
			console.error("No se encontró el menú", error);
			return;
		}

		this.contextMenu.style.display = "block";
		this.contextMenu.style.left = `${pageX}px`;
		this.contextMenu.style.top = `${pageY}px`;
	}

	async showOptionMenu() {
		try {
			console.log("[showOptionMenu 1]");

			await this.validateElementSelected();

			const { edit, editQr, editQrText, fontSize, deleteContent, resize } = this.optionMenuContextual;
			const { selectedElement: element } = this;

			this.contextMenu.classList.remove("inactive");

			edit.classList.toggle("show", !element.matches(".codigo-QR"));
			editQr.classList.toggle("show", element.matches(".codigo-QR"));
			deleteContent.classList.toggle("show", element);
			editQrText.classList.toggle("show", element.matches(".codigo-QR"));
			fontSize.classList.toggle("show", element.matches(".texto-plano"));
			resize.classList.toggle("show", !element.matches(".texto-plano"));
		} catch (error) {
			console.log("[showOptionMenu 2]");
			this.contextMenu.classList.add("inactive");
			console.error("Error:  ha ocurrido un error al mostrar el menú de opciones", error);
		}
	}

	handleOpenMenu(e) {
		try {
			e.preventDefault();

			const element = e.target;
			const nodeName = element.nodeName;

			this.formFontSize.classList.add("d-none");

			console.log("handleOpenMenu:", "[", nodeName, "]", element);

			// Verifica si el nodo es 'P' o 'IMG'
			if (this.handleSelectedElement[nodeName]) {
				// Asigna el elemento seleccionado utilizando la lógica correspondiente
				this.selectedElement = this.handleSelectedElement[nodeName]({ element });
			} else {
				console.log(`El elemento ${nodeName} no es válido para selección.`);
				this.selectedElement = null; // Opcional: Desasignar si no es P o IMG o FIGCAPTION
			}

			const { pageX, pageY } = e;
			this.showOptionMenu();
			this.showContentMenu({ pageX, pageY });
		} catch (error) {
			console.error("Error: Ha ocurrido un error al abrir el menu Contextual", error);
		}
	}
}

window.addEventListener("load", () => new ContextMenuHandler(), { once: true });
