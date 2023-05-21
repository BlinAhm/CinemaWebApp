using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace CinemaApp.Selenium_Tests
{
    public class BlinTests
    {
        WebDriver driver = new EdgeDriver();

        [Test]
        public void ReserveTicketTest()
        {
            driver.Navigate().GoToUrl("https://localhost:44465/movies");
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.TagName("td")).Click();

            driver.FindElement(By.ClassName("buy")).Click();

            if (driver.FindElement(By.ClassName("input-div")) != null)
            {
                //Assert.Fail("User not logged in!");
                driver.FindElement(By.Name("Email")).SendKeys("blin@email.com");
                driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
                driver.FindElement(By.ClassName("loginSubmit")).Click();
            }

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("user-details"));
            driver.Navigate().GoToUrl("https://localhost:44465/movies");

            driver.FindElement(By.TagName("td")).Click();
            driver.FindElement(By.ClassName("buy")).Click();

            driver.FindElement(By.Id("hall1")).Click();

            Thread.Sleep(500);
            driver.FindElements(By.CssSelector(".free-seat"))[3].Click();

            driver.FindElement(By.ClassName("checkout")).Click();

            Thread.Sleep(1000);
            if (driver.SwitchTo().Alert().Text.Contains("Seats booked"))
                driver.SwitchTo().Alert().Accept();

            driver.Close();
            driver.Quit();
        }

        [Test]
        public void SignUpTest()
        {
            Random random = new Random();
            var email = "test" + random.Next(1000) + "@email.com";

            driver.Navigate().GoToUrl("https://localhost:44465/sign-up");
            driver.FindElement(By.Name("FirstName")).SendKeys("test");
            driver.FindElement(By.Name("LastName")).SendKeys("tester");
            driver.FindElement(By.Name("Email")).SendKeys(email);
            driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
            driver.FindElement(By.Name("cpass")).SendKeys("Password@1234");

            driver.FindElement(By.Name("btnSubmit")).Click();

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("loginSubmit"));

            driver.FindElement(By.Name("Email")).SendKeys(email);
            driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
            driver.FindElement(By.ClassName("loginSubmit")).Click();

            if (driver.FindElement(By.ClassName("user-details")) != null)
            {
                driver.Close();
                driver.Quit();
            }
        }

        [Test]
        public void AddUserTest()
        {
            Random random = new Random();
            var email = "test" + random.Next(1000) + "@email.com";

            driver.Navigate().GoToUrl("https://localhost:44465/home");

            if (driver.FindElement(By.ClassName("login")) != null)
            {
                driver.Navigate().GoToUrl("https://localhost:44465/log-in");
                driver.FindElement(By.Name("Email")).SendKeys("blin@email.com");
                driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
                driver.FindElement(By.ClassName("loginSubmit")).Click();
            }

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("user-details"));

            driver.FindElement(By.CssSelector(".page-header img")).Click();

            driver.FindElement(By.CssSelector("a[href*=\"users\"]")).Click();
            driver.FindElement(By.Id("insertBtn")).Click();

            driver.FindElement(By.CssSelector("input[class=userInputs][name=firstName]")).SendKeys("test");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=lastName]")).SendKeys("tester");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=email]")).SendKeys(email);
            driver.FindElement(By.CssSelector("input[class=userInputs][name=password]")).SendKeys("Password@1234");

            driver.FindElement(By.Name("insert")).Click();

            Thread.Sleep(1000);

            IWebElement body = driver.FindElement(By.TagName("body"));

            if (body.Text.Contains(email))
            {
                driver.Close();
                driver.Quit();
            }
        }

        [Test]
        public void DeleteUserTest()
        {
            driver.Navigate().GoToUrl("https://localhost:44465/home");

            if (driver.FindElement(By.ClassName("login")) != null)
            {
                driver.Navigate().GoToUrl("https://localhost:44465/log-in");
                driver.FindElement(By.Name("Email")).SendKeys("blin@email.com");
                driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
                driver.FindElement(By.ClassName("loginSubmit")).Click();
            }

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("user-details"));

            driver.FindElement(By.CssSelector(".page-header img")).Click();

            driver.FindElement(By.CssSelector("a[href*=\"users\"]")).Click();
            var row = driver.FindElement(By.CssSelector("tbody tr"));
            var email = row.FindElements(By.CssSelector("td"))[2].Text;
            var td = row.FindElements(By.CssSelector("td"))[5].FindElement(By.CssSelector("div"));
            td.Click();
            Thread.Sleep(1000);

            IWebElement body = driver.FindElement(By.TagName("body"));

            if (!body.Text.Contains(email))
            {
                driver.Close();
                driver.Quit();
            }

        }
    }
}
