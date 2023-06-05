using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;

namespace CinemaApp.Selenium_Tests
{
    public class ArberTests
    {
        WebDriver driver = new EdgeDriver();

        [Test]
        public void AddMovieTest()
        {
            Random random = new Random();
            var title = "TestMovie" + random.Next(100);

            driver.Navigate().GoToUrl("https://localhost:44465/home");

            if (driver.FindElement(By.ClassName("login")) != null)
            {
                driver.Navigate().GoToUrl("https://localhost:44465/log-in");
                driver.FindElement(By.Name("Email")).SendKeys("blin@email.com");//Admin email
                driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
                driver.FindElement(By.ClassName("loginSubmit")).Click();
            }

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("user-details"));
            
            //Enters dashboard
            driver.FindElement(By.CssSelector(".page-header img")).Click();

            driver.FindElement(By.CssSelector("a[href*=\"dashboard/movies\"]")).Click();
            driver.FindElement(By.Id("insertBtn")).Click();

            driver.FindElement(By.CssSelector("input[class=userInputs][name=imageLink]")).SendKeys("https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Light-With-Image.jpg?x81279");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=title]")).SendKeys(title);
            driver.FindElement(By.CssSelector("textarea[class=userInputs][name=description]")).SendKeys("Action movie: \"I'm not in the game! \"Something happened to someone you love.\" \"I'm back in the game!\"");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=duration]")).SendKeys("120");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=category]")).SendKeys("Action");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=rating]")).SendKeys("8.0");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=director]")).SendKeys("Tester");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=trailerId]")).SendKeys("KAOdjqyG37A");
            driver.FindElement(By.CssSelector("input[class=userInputs][name=price]")).SendKeys("3");

            driver.FindElement(By.Name("insert")).Click();

            Thread.Sleep(1000);

            IWebElement body = driver.FindElement(By.TagName("body"));

            if (body.Text.Contains(title))
            {
                driver.Close();
                driver.Quit();
            }
        }

        [Test]
        public void DeleteMovieTest()
        {
            driver.Navigate().GoToUrl("https://localhost:44465/home");

            if (driver.FindElement(By.ClassName("login")) != null)
            {
                driver.Navigate().GoToUrl("https://localhost:44465/log-in");
                driver.FindElement(By.Name("Email")).SendKeys("blin@email.com");//Admin email
                driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
                driver.FindElement(By.ClassName("loginSubmit")).Click();
            }

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("user-details"));

            //Enters dashboard
            driver.FindElement(By.CssSelector(".page-header img")).Click();

            driver.FindElement(By.CssSelector("a[href*=\"dashboard/movies\"]")).Click();
            var tbody = driver.FindElements(By.CssSelector("tbody"))[1];
            var row = tbody.FindElements(By.CssSelector("tr"))[1];
            var title = row.FindElements(By.CssSelector("td"))[2].Text;
            var deleteBtn = row.FindElements(By.CssSelector("td"))[7].FindElements(By.CssSelector("div"))[1];
            deleteBtn.Click();

            Thread.Sleep(1000);

            IWebElement body = driver.FindElement(By.TagName("body"));

            if (!body.Text.Contains(title))
            {
                driver.Close();
                driver.Quit();
            }
        }

        [Test]
        public void EditMovieTest()
        {
            driver.Navigate().GoToUrl("https://localhost:44465/home");

            if (driver.FindElement(By.ClassName("login")) != null)
            {
                driver.Navigate().GoToUrl("https://localhost:44465/log-in");
                driver.FindElement(By.Name("Email")).SendKeys("blin@email.com");//Admin email
                driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
                driver.FindElement(By.ClassName("loginSubmit")).Click();
            }

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("user-details"));

            //Enters dashboard
            driver.FindElement(By.CssSelector(".page-header img")).Click();

            driver.FindElement(By.CssSelector("a[href*=\"dashboard/movies\"]")).Click();
            var tbody = driver.FindElements(By.CssSelector("tbody"))[1];
            var row = tbody.FindElements(By.CssSelector("tr"))[1];
            var title = row.FindElements(By.CssSelector("td"))[2].Text;
            var editBtn = row.FindElements(By.CssSelector("td"))[7].FindElements(By.CssSelector("div"))[0];
            editBtn.Click();

            driver.FindElement(By.CssSelector("input[class=updateInputs][name=title]")).SendKeys(" - Edited");

            driver.FindElement(By.Name("update")).Click();

            Thread.Sleep(1000);

            IWebElement body = driver.FindElement(By.TagName("body"));

            if (body.Text.Contains(title+" - Edited"))
            {
                driver.Close();
                driver.Quit();
            }
        }

        [Test]
        public void AdminDashboardTest()
        {
            driver.Navigate().GoToUrl("https://localhost:44465/home");

            if (driver.FindElement(By.ClassName("login")) != null)
            {
                driver.Navigate().GoToUrl("https://localhost:44465/log-in");
                driver.FindElement(By.Name("Email")).SendKeys("blin@email.com");//Admin email
                driver.FindElement(By.Name("Password")).SendKeys("Password@1234");
                driver.FindElement(By.ClassName("loginSubmit")).Click();
            }

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            driver.FindElement(By.ClassName("user-details"));

            //Enters dashboard
            driver.FindElement(By.CssSelector(".page-header img")).Click();

            Thread.Sleep(1000);

            IWebElement body = driver.FindElement(By.TagName("body"));

            if (body.Text.Contains("Admin"))
            {
                driver.Close();
                driver.Quit();
            }
        }
    }
}
