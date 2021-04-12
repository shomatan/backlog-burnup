import facade.googleappsscript.GoogleAppsScript
import facade.googleappsscript.html.HtmlOutput

import scala.scalajs.js
import scala.scalajs.js.annotation._

trait Config extends js.Object {
  val space: js.UndefOr[String]      = js.undefined
  val domain: js.UndefOr[String]     = js.undefined
  val apiKey: js.UndefOr[String]     = js.undefined
  val projectKey: js.UndefOr[String] = js.undefined
}

object Main {

  @JSExportTopLevel("doGet")
  def doGet(): HtmlOutput =
    GoogleAppsScript.HtmlService.createTemplateFromFile("index").evaluate()

  @JSExportTopLevel("getConfig")
  def getConfig(): Config = {
    val properties = GoogleAppsScript.PropertiesService.getUserProperties()

    new Config {
      override val space      = properties.getProperty("space")
      override val domain     = properties.getProperty("domain")
      override val apiKey     = properties.getProperty("apiKey")
      override val projectKey = properties.getProperty("projectKey")
    }
  }

  // @JSExportTopLevel("onOpenImpl")
  // def onOpen(): Unit = {
  //   SpreadsheetApp
  //     .getUi()
  //     .createMenu("Backlog")
  //     .addItem("Step-1: Init", "init")
  //     // .addItem("Step-2: Run", "run")
  //     .addToUi()
  // }

  // @JSExportTopLevel("init")
  // def init(): Unit =
  //   throw new Exception("init!")

}
