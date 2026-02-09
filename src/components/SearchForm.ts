// ================================
// Componente: SearchForm
// ================================

export class SearchForm {
  private form: HTMLFormElement;
  private input: HTMLInputElement;

  constructor(container: HTMLElement) {
    this.form = document.createElement("form");
    this.input = document.createElement("input");

    this.setupForm();
    container.appendChild(this.form);
  }

  // ================================
  // Setup
  // ================================

  private setupForm(): void {
    this.form.className = "search-form";

    this.input.type = "text";
    this.input.placeholder = "Digite o nome da cidade";
    this.input.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Buscar";

    this.form.appendChild(this.input);
    this.form.appendChild(button);

    this.form.addEventListener("submit", this.handleSubmit);
  }

  // ================================
  // Eventos
  // ================================

  private handleSubmit = (event: Event): void => {
    event.preventDefault();

    const city = this.input.value.trim();

    if (!city) return;

    // Emite evento customizado
    this.form.dispatchEvent(
      new CustomEvent("citySearch", {
        detail: city,
        bubbles: true,
      })
    );

    this.input.value = "";
  };

  // ================================
  // API pública do componente
  // ================================

  public getElement(): HTMLFormElement {
    return this.form;
  }
}
