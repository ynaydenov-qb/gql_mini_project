import { Book, Customer, LendingRecord } from "./models";
import { BooksDataSource } from "./data/booksDataSource";
import { CustomersDataSource } from "./data/customersDataSource";

const booksDataSource = new BooksDataSource();
const customersDataSource = new CustomersDataSource();

export const resolvers = {
  Query: {
    books: (): Book[] => booksDataSource.getBooks(),
    book: (_: any, { id }: { id: string }): Book | undefined => {
      return booksDataSource.getBookById(id);
    },
    customers: (): Customer[] => customersDataSource.getCustomers(),
    customer: (_: any, { id }: { id: string }): Customer | undefined =>
      customersDataSource.getCustomerById(id),
  },

  Mutation: {
    addBook: (
      _: any,
      { id, title, author }: { id: string; title: string; author: string }
    ): Book => {
      const newBook = new Book(id, title, author);
      booksDataSource.addBook(newBook);
      return newBook;
    },
    addCustomer: (
      _: any,
      { id, name, email }: { id: string; name: string; email: string }
    ): Customer => {
      const newCustomer = new Customer(id, name, email);
      customersDataSource.addCustomer(newCustomer);
      return newCustomer;
    },

    lendBook: (
      _: any,
      {
        bookId,
        customerId,
        lentDate,
        dueDate,
      }: {
        bookId: string;
        customerId: string;
        lentDate: string;
        dueDate: string;
      }
    ): Book => {
      const book = booksDataSource.getBookById(bookId);
      const customer = customersDataSource.getCustomerById(customerId);

      if (book && customer && !book.isLent) {
        const record = new LendingRecord(customer.id, lentDate, dueDate);

        book.isLent = true;
        book.currentLendeeId = customer.id;
        book.dueDate = dueDate;
        book.lendingHistory.push(record);
        booksDataSource.updateBook(book);

        return book;
      } else {
        throw new Error("Book is already lent or does not exist.");
      }
    },
    returnBook: (
      _: any,
      { bookId, returnDate }: { bookId: string; returnDate: string }
    ): Book => {
      const book = booksDataSource.getBookById(bookId);
      if (book && book.isLent) {
        const record = book.lendingHistory.find((r) => !r.returnDate);
        if (record) {
          record.returnDate = returnDate;
          book.isLent = false;
          book.currentLendeeId = undefined;
          book.dueDate = undefined;
          booksDataSource.updateBook(book);

          return book;
        }
      }
      throw new Error("Book is not currently lent or does not exist.");
    },
  },

  Book: {
    currentLendee: (book: Book): Customer | null => {
      if (book.currentLendeeId)
        return customersDataSource.getCustomerById(book.currentLendeeId)!;
      return null;
    },
    lendingHistory: (book: Book): LendingRecord[] => {
      return book.lendingHistory;
    },
  },

  LendingRecord: {
    customer: (record: LendingRecord): Customer => {
      return customersDataSource.getCustomerById(record.customerId)!;
    },
  },
};
