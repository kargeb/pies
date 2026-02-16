# 🚀 PLAN: Angular Live Coding "God Mode" (1 Dzień)

Cel: Opanowanie nowoczesnego Angulara (v17+) do poziomu płynnego pisania kodu na żywo.
Zasada: **Zero Legacy**. Piszemy tylko w nowym stylu (Standalone, Signals, New Control Flow).

---

## 🕒 BLOK 1: Fundamenty & Widok (09:00 - 12:00)
**Cel:** Zapomnieć o `NgModule`, `*ngIf` i dekoratorach `@Input`.

### 1. Standalone Components (Obowiązkowe)
- [ ] Każdy komponent ma `standalone: true`.
- [ ] Importujemy zależności bezpośrednio w `@Component({ imports: [CommonModule, ...] })`.
- [ ] **Bootstrap:** `bootstrapApplication(AppComponent)` w `main.ts` (zamiast `platformBrowserDynamic`).

### 2. Signals (State Management)
- [ ] Zmienne lokalne jako `signal('initial')`.
- [ ] Aktualizacja: `this.count.update(v => v + 1)` lub `this.name.set('Nowe')`.
- [ ] Wyświetlanie w template: `{{ count() }}` (nawiasy są kluczowe!).
- [ ] **Computed:** `doubleCount = computed(() => this.count() * 2)`.

### 3. Nowe Control Flow (Template)
- [ ] `@if (isLoading()) { ... } @else { ... }` (zamiast `*ngIf`).
- [ ] `@for (user of users(); track user.id) { ... } @empty { Brak danych }` (zamiast `*ngFor`).
- [ ] `@switch (status()) { @case ('active') { ... } }`.

### 4. Nowe Inputs/Outputs
- [ ] `user = input.required<User>()` (zamiast `@Input()`).
- [ ] `delete = output<number>()` (zamiast `@Output()`).
- [ ] Emitowanie: `this.delete.emit(123)`.

---

## 🕒 BLOK 2: Komunikacja z API & RxJS Interop (12:00 - 15:00)
**Cel:** Elegancka obsługa asynchroniczności bez "callback hell" i `.subscribe()` w komponentach.

### 1. Dependency Injection (Modern Style)
- [ ] `private userService = inject(UserService)` (zamiast konstruktora).
- [ ] Tworzenie serwisu: `@Injectable({ providedIn: 'root' })`.

### 2. Pobieranie danych (HTTP)
- [ ] W serwisie: Metoda zwraca `Observable<User[]>`.
- [ ] W komponencie: **Nie rób subscribe!**
- [ ] Użyj `toSignal`:
  ```typescript
  users = toSignal(this.userService.getUsers(), { initialValue: [] });
  ```
- [ ] **Resource API (Opcjonalnie - dla szpanu w v19+):** `httpResource`.

### 3. Obsługa Loading/Error
- [ ] Użyj operatorów RxJS w serwisie (`catchError`, `finalize`) lub sygnałów stanu.
- [ ] Przykład prosty:
  ```html
  @if (users().length === 0) { <loader /> }
  ```

---

## 🕒 BLOK 3: Formularze & Walidacja (15:00 - 18:00)
**Cel:** Szybkie tworzenie formularzy, które są typowane (bezpieczne).

### 1. Reactive Forms (Typed)
- [ ] `fb = inject(NonNullableFormBuilder)` (Ważne: NonNullable!).
- [ ] Struktura:
  ```typescript
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  ```

### 2. Walidacja w Template
- [ ] Wyświetlanie błędów:
  ```html
  @if (form.controls.email.hasError('required') && form.controls.email.touched) {
    <span>Email jest wymagany</span>
  }
  ```

### 3. Custom Validator
- [ ] Napisz prostą funkcję:
  ```typescript
  const forbiddenNameValidator = (name: RegExp): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = name.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  };
  ```

---

## 🕒 BLOK 4: Architektura & Performance (18:00 - 20:00)
**Cel:** Pokazanie, że jesteś Seniorem i dbasz o wydajność.

### 1. OnPush (Zawsze!)
- [ ] W każdym komponencie: `changeDetection: ChangeDetectionStrategy.OnPush`.
- [ ] Z sygnałami działa to automatycznie i bezboleśnie.

### 2. Prosty Pipe (Pure)
- [ ] Stwórz Pipe do transformacji danych (np. `FullNamePipe`).
- [ ] Pamiętaj o `standalone: true`.

### 3. Struktura plików (Feature Based)
- [ ] `/users/ui/user-card` (prezentacyjny)
- [ ] `/users/data-access/users.service` (logika)
- [ ] `/users/feature/user-list` (smart component)

---

## 📝 ĆWICZENIE PRAKTYCZNE (Zrób to 3 razy)
Stwórz aplikację "Search & Edit":
1.  Pobierz listę userów z `https://jsonplaceholder.typicode.com/users`.
2.  Wyświetl ich w tabeli używając `@for`.
3.  Dodaj pole wyszukiwania (input), które filtruje listę (użyj `computed` signal).
4.  Kliknięcie w usera otwiera formularz edycji (z walidacją).
5.  Zapisanie aktualizuje listę lokalnie.

**Powodzenia! Bądź prze chujem.**
