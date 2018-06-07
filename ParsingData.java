import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;

public class ParsingData {
 public static void main(String[] args) {
  System.out.println("Program executing...");
  StringBuilder sb = new StringBuilder("#1\t#2\t#3\t#4\t#5\t#6\t#X\n");
  int drawNum = 1;
  while (true) {
   try {
    URL url = new URL("https://www.lldj.com/en/LatestResults/Loto?draw=" + drawNum);
    InputStream is = url.openStream();
    BufferedReader br = new BufferedReader(new InputStreamReader(is));
    br.skip(27000);
    String line;

    while ((line = br.readLine()) != null) {
     if (line.startsWith("                <li class=\"ball big  ball-")) {
      line = line.substring(line.indexOf("-") + 1, line.indexOf("\">"));
      sb.append(line + "\t");
     } else if (line.startsWith("                <li class=\"ball big extraball ball-")) {
      line = line.substring(line.indexOf("-") + 1, line.indexOf("\">"));
      sb.append(line + "\n");
      break;
     }
    }
    System.out.println("Retrived data from draw #" + drawNum);
    drawNum++;
   } catch (IOException e) {
    // TODO Auto-generated catch block
    break;
   }
  }
  File file = new File("data.txt");
  try {
   FileWriter fw = new FileWriter(file);
   BufferedWriter bw = new BufferedWriter(fw);
   PrintWriter outToFile = new PrintWriter(bw);
   System.out.println("Writing file...");
   outToFile.println(sb);
   outToFile.close();
  } catch (IOException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  }

  System.out.println("All data collected");

 }
}
