const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000';

test('Verify "All Books" link is visible', async({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" button is visible', async({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonButtonVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksLinkVisible = await myBooksLink.isVisible();

    expect(isMyBooksLinkVisible).toBe(true);
});

test('Verify "Add Books" link is visible after user login', async({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookLink = await page.$('a[href="/create"]');
    const isAddBookLinkVisible = await addBookLink.isVisible();

    expect(isAddBookLinkVisible).toBe(true);
});

test('Verify email is visible after user login', async({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const span = await page.$('span:has-text("Welcome, peter@abv.bg")');
    const spanIsVisible = await span.isVisible();

    expect(spanIsVisible).toBe(true);
});

test('Login with valid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(`${baseUrl}/catalog`);
});

test('Login with no credentials', async ({ page }) => {
    const loginUrl = `${baseUrl}/login`;
    await page.goto(loginUrl);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="login"]');
    expect(page.url()).toBe(loginUrl);
});

test('Login with no email', async({page}) => {
    const loginUrl = `${baseUrl}/login`;
    await page.goto(loginUrl);
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="login"]');
    expect(page.url()).toBe(loginUrl);
});

test('Login with no password', async({page}) => {
    const loginUrl = `${baseUrl}/login`;
    await page.goto(loginUrl);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="login"]');
    expect(page.url()).toBe(loginUrl);
});

test('Register with valid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/register`);
    await page.fill('input[name="email"]', 'az3@abv.bg');
    await page.fill('input[name="password"]', '12345678');
    await page.fill('input[name="confirm-pass"]', '12345678');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(`${baseUrl}/catalog`);
});

test('Register with no credentials', async ({ page }) => {
    const registerUrl = `${baseUrl}/register`;
    await page.goto(registerUrl);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with no email', async( {page} ) => {
    const registerUrl = `${baseUrl}/register`;
    await page.goto(registerUrl);
    await page.fill('input[name="password"]', '1234567');
    await page.fill('input[name="confirm-pass"]', '1234567');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with no password', async({page}) => {
    const registerUrl = `${baseUrl}/register`;
    await page.goto(registerUrl);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="confirm-pass"]', '12345678');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with no repeat password', async({page}) => {
    const registerUrl = `${baseUrl}/register`;
    await page.goto(registerUrl);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '12345678');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with different passwords', async({page}) => {
    const registerUrl = `${baseUrl}/register`;
    await page.goto(registerUrl);
    await page.fill('input[name="email"]', 'ti@abv.bg');
    await page.fill('input[name="password"]', '12345678');
    await page.fill('input[name="confirm-pass"]', '1234');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    });

    await page.$('a[href="register"]');
    expect(page.url()).toBe(registerUrl);
});

let logInUser = async function(page) {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.waitForURL(`${baseUrl}/catalog`);
}

let logInUserJohn = async function(page) {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
}

let registerUser = async function(page, email, password) {
    await page.goto(`${baseUrl}/register`);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirm-pass"]', password);
    await page.click('input[type="submit"]');
}

test('Add book with correct data', async({ page }) => {
    logInUser(page);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    await page.waitForURL(`${baseUrl}/catalog`);
    expect(page.url()).toBe(`${baseUrl}/catalog`);
});

test('Add book with empty title field', async({ page }) => {
    logInUser(page);

    await page.waitForURL(`${baseUrl}/catalog`);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(`${baseUrl}/create`);
});

test('Login and verify all books are displayed', async({ page }) => {
    logInUser(page);

    await page.waitForURL(`${baseUrl}/catalog`);
    await page.waitForSelector('.dashboard');

    const bookElements = await page.$$('.other-books-list li');

    if (bookElements.length > 0) {
        expect(bookElements.length).toBeGreaterThan(0);
    } else{
        const noBookMessage = await page.textContent('.no-books');
        expect(noBookMessage).toBe('No books in database!');
    }
});

test('Login and navigate to Details page', async ({ page }) => {
    logInUser(page);
    await page.waitForURL(`${baseUrl}/catalog`);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Navigate to Details page like a guest', async ({ page }) => {
    await page.goto(baseUrl);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Login, navigate to Details page and check if user can see edit/delete buttons', async ({ page }) => {
    logInUser(page);
    await page.waitForURL(`${baseUrl}/catalog`);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    await page.click('a[href="/details/2949b54d-b163-4a00-b65c-41fb8b641561"]');
    await page.waitForSelector('.book-information');
    const editBtn = await page.$('a[href="/edit/2949b54d-b163-4a00-b65c-41fb8b641561"]');
    const deleteBtn = await page.$(`a:text('Delete')`);

    const editBtnVisible = await editBtn.isVisible();
    const deleteBtnVisible = await deleteBtn.isVisible();

    expect(editBtnVisible).toBe(true);
    expect(deleteBtnVisible).toBe(true);
});

test('Check edit/delete btns are not visible for non creator', async ({ page }) => {
    logInUserJohn(page);
    await page.waitForURL(`${baseUrl}/catalog`);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    await page.click('a[href="/details/2949b54d-b163-4a00-b65c-41fb8b641561"]');
    await page.waitForSelector('.book-information');
    const editBtn = await page.$('a[href="/edit/2949b54d-b163-4a00-b65c-41fb8b641561"]');
    const deleteBtn = await page.$(`a:text('Delete')`);

    expect(editBtn).toBeNull();
    expect(deleteBtn).toBeNull();
});

test('Verify if like button is not visible for creator', async ({ page }) => {
    logInUserJohn(page);
    await page.waitForURL(`${baseUrl}/catalog`);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    await page.click('a[href="/details/f6f54fcd-0469-470b-8ffa-a33ae6c7a524"]');
    await page.waitForSelector('.book-information');
    const likeBtn = await page.$(`a:text('Like')`);

    expect(likeBtn).toBeNull();
});

test('Verify if like button is visible for non-creator', async ({ page }) => {
    logInUserJohn(page);
    await page.waitForURL(`${baseUrl}/catalog`);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');

    await page.click('a[href="/details/2949b54d-b163-4a00-b65c-41fb8b641561"]');
    await page.waitForSelector('.book-information');
    const likeBtn = await page.$(`a:text('Like')`);
    const likeBtnVisible = await likeBtn.isVisible();
    expect(likeBtnVisible).toBe(true);
});

test('Verify redirection of logout link after user login', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectedURL = page.url();
    expect(redirectedURL).toBe(`${baseUrl}/catalog`);
});
