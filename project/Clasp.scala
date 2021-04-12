import scala.sys.process._
import java.io.File

object Clasp {

  def login = {
    val out = scala.collection.mutable.ArrayBuffer[String]()
    val err = scala.collection.mutable.ArrayBuffer[String]()

    val logger = ProcessLogger((o: String) => out += o, (e: String) => err += e)

    Process(Seq("clasp", "login")) ! logger

    println(out.toList.mkString("\n"))
    println(err.toList.mkString("\n"))
  }

  def push = {
    val out = scala.collection.mutable.ArrayBuffer[String]()
    val err = scala.collection.mutable.ArrayBuffer[String]()

    val logger   = ProcessLogger((o: String) => out += o, (e: String) => err += e)
    val distFile = new File("dist/main.js")

    sbt.IO.copyFile(
      new File("target/scala-2.13/backlog-burnup-fastopt/main.js"),
      distFile
    )

    val lines = scala.io.Source.fromFile(distFile).getLines().toIndexedSeq
    // val insert = s"""
    // |function onOpen() {
    // |  return onOpenImpl();
    // |}
    // """.stripMargin

    val converted = Seq("<script>") ++ lines ++ Seq("</script>")

    val writer = new java.io.PrintWriter(new File("dist/bundle.html"))
    writer.write(converted.mkString("\n"))
    writer.close()

    Process(command = "clasp push -f") ! logger

    println(out.toList.mkString("\n"))
    println(err.toList.mkString("\n"))
  }
}
