use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::env;

fn handle_client(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    let request_str = String::from_utf8_lossy(&buffer);

    if let Some(request_line) = request_str.lines().next() {
        let request_parts: Vec<&str> = request_line.split_whitespace().collect();
        if request_parts.len() >= 2 && request_parts[1] == "/ping" {
            // Extraire les en-têtes de la requête
            let request_headers: Vec<&str> = request_str.lines().take_while(|line| !line.is_empty()).collect();

            let response = format!(
                "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nCustom-Header: \r\n\r\n{:?}",
                request_headers
            );

            stream.write(response.as_bytes()).unwrap();
            stream.flush().unwrap();
        } else {
            let response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nNot Found";

            stream.write(response.as_bytes()).unwrap();
            stream.flush().unwrap();
        }
    }
}

fn main() {
    // Obtenez la valeur de la variable d'environnement PING_LISTEN_PORT
    let port = env::var("PING_LISTEN_PORT").unwrap_or_else(|_| String::from("8080"));

    // Convertissez la chaîne en entier, si nécessaire
    let port: u16 = port.parse().expect("Le port doit être un nombre entier");

    let mut ipAndPort: String = String::from("127.0.0.1:");
    ipAndPort = format!("{}{}", ipAndPort, &port.to_string());
    
    
    println!("{}{}","Server listening on ", ipAndPort);
    let listener = TcpListener::bind(ipAndPort).expect("Error binding to address");


    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                std::thread::spawn(|| {
                    handle_client(stream);
                });
            }
            Err(e) => {
                eprintln!("Error accepting connection: {}", e);
            }
        }
    }
}
