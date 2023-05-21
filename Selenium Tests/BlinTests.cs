using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;

namespace CinemaApp.Selenium_Tests
{
    public class BlinTests
    {
        WebDriver driver = new EdgeDriver();

        [Test]
        public void Homepage()
        {
            driver.Navigate().GoToUrl("https://localhost:44465/home");

            Assert.AreEqual("CinemaApp", driver.Title);

            driver.Close();
            driver.Quit();
        }
    }
}
